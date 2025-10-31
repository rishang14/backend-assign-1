import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.course.create({
    data: {
      course_name: "Next.js in 2 Months",
      duration: "2 Months",
      progress: 0,
      modules: {
        create: [
          {
            module_name: "Getting Started with Next.js",
            videos: {
              create: [
                { sno: 1, video_name: "Introduction to React and Next.js", completed: false },
                { sno: 2, video_name: "Setting up the Development Environment", completed: false },
                { sno: 3, video_name: "Understanding Pages and Routing", completed: false },
              ],
            },
          },
          {
            module_name: "Styling and Layouts",
            videos: {
              create: [
                { sno: 4, video_name: "Using CSS Modules", completed: false },
                { sno: 5, video_name: "Global Styles and Layout Components", completed: false },
                { sno: 6, video_name: "Tailwind CSS Integration", completed: false },
              ],
            },
          },
          {
            module_name: "Data Fetching and APIs",
            videos: {
              create: [
                { sno: 7, video_name: "Static Generation with getStaticProps", completed: false },
                { sno: 8, video_name: "Server-side Rendering (SSR)", completed: false },
                { sno: 9, video_name: "API Routes in Next.js", completed: false },
              ],
            },
          },
          {
            module_name: "Authentication and State Management",
            videos: {
              create: [
                { sno: 10, video_name: "NextAuth.js for Authentication", completed: false },
                { sno: 11, video_name: "JWT Tokens and Protected Routes", completed: false },
                { sno: 12, video_name: "Using Zustand / Redux Toolkit", completed: false },
              ],
            },
          },
          {
            module_name: "Advanced Topics and Deployment",
            videos: {
              create: [
                { sno: 13, video_name: "Dynamic Imports and Code Splitting", completed: false },
                { sno: 14, video_name: "Image Optimization", completed: false },
                { sno: 15, video_name: "Deploying on Vercel and AWS Amplify", completed: false },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("✅ Seeded: Next.js in 2 Months");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
