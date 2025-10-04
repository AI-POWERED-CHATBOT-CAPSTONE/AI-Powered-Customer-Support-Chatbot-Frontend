import PreAuthNav from "@/components/nav/pre-auth-nav";
import Intro from "@/components/website/intro";
import GetStarted from "@/components/website/get-started";

export default function Home() {
  return (
      <>
        <PreAuthNav />
        <main className={"h-screen flex"}>
            <div className={"w-[50%] h-full flex justify-center items-center"}>
                <Intro />
            </div>
            <div className={"w-[50%] h-full flex justify-center items-center bg-foreground bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"}>
                <GetStarted />
            </div>
        </main>
      </>

  );
}
