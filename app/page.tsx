import Container1 from "@/components/container1/container1";
import Container3 from "@/components/container3/container3";
import Container4 from "@/components/container4/container4";
import GloboContainer from "@/components/earth-container/container3";

export default function Home() {
  return (
    <>
      <Container1 />
      <GloboContainer />

      <Container3 />
      <Container4 />
    </>
  );
}
