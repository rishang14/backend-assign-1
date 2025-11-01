import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getCoures = async (req, res) => {
  try {
    const course = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            videos: true,
          },
        },
      },
    });

    if (!course) return res.status(404).json({ message: "Course not found" });

    return res.json(course);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateCourseProgress = async (req, res) => {
  const { courseId, moduleId } = req.params;
  const val = req.body;

  try {
    // make all the video inside the model as per the val
    // then get all the videos couunt and then all the true ones
    // then calc the progress and return it
    const model = await prisma.video.updateMany({
      where: {
        moduleId: +moduleId,
      },
      data: {
        completed: Boolean(val),
      },
    });
    const totalVideos = await prisma.video.count({
      where: {
        module: {
          courseId: +courseId,
        },
      },
    });
  const completedVideos = await prisma.video.count({
      where: {
        module: { courseId: +courseId },
        completed: true,
      },
    });

    const progress =   totalVideos > 0 ?(completedVideos / totalVideos) * 100 : 0.0;

    const updatedCourse = await prisma.course.update({
      where: { id: +courseId },
      data: {
        progress:parseFloat(progress.toFixed(2)),
      },
    });

    return res.json({
      message: "Course progress updated successfully",
      progress: updatedCourse.progress,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update progress" });
  }
};
