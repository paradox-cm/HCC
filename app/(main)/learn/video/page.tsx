import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoFillIcon from 'remixicon-react/VideoFillIcon';

// Import videos array from the learn page
import { videos } from "../videos-data";

function getRandomVideos(count: number) {
  // Shuffle and pick first 'count' videos
  const shuffled = [...videos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function VideoPlayerPage() {
  const relatedVideos = getRandomVideos(3);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-[152px] px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Sticky Back Button */}
        <div className="sticky top-[104px] z-30 mb-6">
          <Button asChild variant="outline" className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <Link href="/learn" aria-label="Back to Learn videos">← Back to Learn</Link>
          </Button>
        </div>
        {/* Video Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden mb-8">
          <div className="aspect-video bg-muted flex items-center justify-center">
            {/* Replace with real video player in future */}
            <video
              className="w-full h-full object-cover rounded-t-2xl"
              controls
              poster="/placeholder.jpg"
              aria-label="Video player"
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Video Title Placeholder</h1>
            <p className="text-muted-foreground mb-4">
              This is a template video player page. In the future, this will show the selected video, its description, transcript, and related content.
            </p>
          </div>
        </div>
        {/* Transcript / Summary Section */}
        <div className="bg-muted rounded-xl p-6 border border-border mb-8 max-h-[340px] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <p className="text-muted-foreground text-sm mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex. Mauris dapibus risus quis suscipit vulputate.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground text-sm mb-4">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Phasellus blandit massa enim. Nullam id varius nunc.</li>
            <li>Vivamus bibendum magna ex, et faucibus lacus venenatis eget.</li>
            <li>Morbi tempus commodo mattis.</li>
          </ul>
          <h3 className="text-base font-semibold mb-2 mt-4">Transcript</h3>
          <div className="text-muted-foreground text-xs space-y-2">
            <p>[00:00] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex.</p>
            <p>[00:15] Mauris dapibus risus quis suscipit vulputate. Egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices.</p>
            <p>[00:30] Pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id.</p>
            <p>[00:45] Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus.</p>
            <p>[01:00] Sed adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit.</p>
            <p>[01:15] Amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod.</p>
          </div>
        </div>
        {/* Related Videos Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedVideos.map((video) => (
              <Link href="/learn/video" key={video.title} className="block focus:outline-none">
                <Card className="overflow-hidden transition-all flex flex-col h-full transform transition duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-95 focus:scale-95 border border-border hover:border-primary">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <VideoFillIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <p className="text-xs text-primary font-semibold uppercase">{video.category}</p>
                    <h4 className="font-semibold mt-1 flex-grow">{video.title}</h4>
                    <p className="text-sm text-muted-foreground mt-2">{video.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 