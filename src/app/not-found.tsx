import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="flex flex-1 flex-col items-center justify-center py-32 text-center"
      >
        <div className="section">
          <div className="section-inner">
            <p className="font-mono text-8xl font-bold text-accent/30">404</p>
            <h1 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">
              Page not found
            </h1>
            <p className="mx-auto mt-4 max-w-md text-text-secondary">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="mt-8">
              <Button href="/">Return home</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
