import { PrismaClient } from "@prisma/client";


const prisma= new PrismaClient();
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

   return  res.json(course);
  } catch (err) {
    console.error(err);
   return res.status(500).json({ message: "Server error" });
  }
};


export const updateCourseProgress = async (req, res) => {
  const { id } = req.params;

  try {
    
    const modules = await prisma.module.findMany({
      where: { courseId: Number(id) },
      include: { videos: true },
    });

    const allVideos = modules.flatMap((m) => m.videos);
    const completedCount = allVideos.filter((v) => v.completed).length;
    const totalCount = allVideos.length;

    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Update progress in course table
    const updatedCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: { progress },
    });

  return  res.json({
      message: "Course progress updated successfully",
      progress: updatedCourse.progress,
    });
  } catch (err) {
    console.error(err);
   return res.status(500).json({ message: "Failed to update progress" });
  }
};
