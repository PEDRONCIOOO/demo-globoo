import AgentChat from "@/components/agent-model/globoo";
import Container1 from "@/components/container1/container1";
import GloboContainer from "@/components/earth-container/container3";

export default function Home() {
  return (
    <>
      <Container1 />
      <GloboContainer />
      <AgentChat
        buttonText="Enviar"
        placeholder="Digite sua mensagem aqui..."
        title="Resposta: "
      />
    </>
  );
}
