import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()
export const markVideoComplete = async (req, res) => {
  const { videoId } = req.params;

  try {
   
    const updatedVideo = await prisma.video.update({
      where: { id: Number(videoId) },
      data: { completed: true },
      include: { module: true },
    });

   
    const courseId = updatedVideo.module.courseId;

    
    const modules = await prisma.module.findMany({
      where: { courseId },
      include: { videos: true },
    });

    const allVideos = modules.flatMap((m) => m.videos);
    const completedCount = allVideos.filter((v) => v.completed).length;
    const totalCount = allVideos.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    await prisma.course.update({
      where: { id: courseId },
      data: { progress },
    });

    res.json({
      message: "Video marked complete & progress updated",
      videoId: updatedVideo.id,
      courseProgress: progress,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to complete video" });
  }
};
