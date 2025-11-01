import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const markVideoComplete = async (req, res) => {
  const { videoId, moduleId } = req.params;
  const { courseId, val } = req.body; 
  console.log(val,"updating for val")
  try {
    // get the total video  and the current progress
    // get the progress of one video and then if val is true then just add that progress and update the value
    // and if false substract that progress and unmarked that video
    const updatedVideo = await prisma.video.update({
      where: { id: +videoId },
      data: {
        completed: val,
      },
    });
    console.log(updatedVideo,"video")
    const totalVideos = await prisma.video.count({
      where: {
        module: {
          courseId: +courseId,
        },
      },
    });
   
    console.log(totalVideos,"videos available")
    const progressPerVideos = 100 / totalVideos;
    const course = await prisma.course.findFirst({
      where: { id: +courseId },
    });  
    let progress;
    if (val) {
      progress = Math.min(course.progress + progressPerVideos, 100);
    } else {
      progress = Math.max(course.progress - progressPerVideos, 0.0);
    }
   
    const courseprogress= await prisma.course.update({
      where:{
        id:+courseId, 
      },
      data:{
       progress: parseFloat(progress.toFixed(2))
      }
    })
    return   res.json({
      message: "Video  complition updated   & progress updated",
      videoId: updatedVideo.id,
      courseProgress: progress.toFixed(2),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to complete video" });
  }
};
