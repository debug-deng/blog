import Home from "@/components/home";
import { batchGetPhotoUrls, listPhotos } from "@/firebase/db/photo";

export default async function App() {
  const paths = {
    photos: "photos",
    avatar: "avatar/eric.jpg",
    dog: "avatar/dog.jpg",
    action: "projects/actions.jpg",
    webagent: "projects/webagent.jpg",
    chatbot: "projects/chatbot.jpg",
    resume: "Chengxiang-Wu-Resume-2024.pdf",
    paper: "projects/paper.jpg",
  };

  const criticalPaths = [paths.avatar, paths.action];
  const criticalUrls = await batchGetPhotoUrls(criticalPaths);

  const remainingPaths = Object.values(paths).filter(
    (path) => !criticalPaths.includes(path) && path !== paths.photos
  );
  const [photos, remainingUrls] = await Promise.all([
    listPhotos(paths.photos),
    batchGetPhotoUrls(remainingPaths),
  ]);

  const webagentUrlPromise = "/月琴特写白底.png";

  return (
    <Home
      actionImageUrl={criticalUrls[paths.action]}
      avatarUrl={criticalUrls[paths.avatar]}
      chatbotUrl={remainingUrls[paths.chatbot]}
      dogUrl={remainingUrls[paths.dog]}
      paperUrl={remainingUrls[paths.paper]}
      photos={photos}
      resumeUrl={remainingUrls[paths.resume]}
      webagentUrl={webagentUrlPromise}
    />
  );
}
