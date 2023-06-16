import HeadingSection from "@/components/layout/heading/HeadingSection";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "@/pages/page";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "@prisma/client";
import { IconX } from "@tabler/icons-react";
import axios from "axios";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAuthentication(context, async (session: any) => {
    const user: User | null = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    return {
      props: {
        user,
      },
    };
  });
};

interface TranscriptionPageProps {
  user: User | null;
}

const Transcription: NextPageWithLayout<TranscriptionPageProps> = ({
  user,
}) => {
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranscribeAndSummarize = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/transcribe");
      setTranscription(res.data.transcription.replace(/\n/g, "<br />"));
      setSummary(res.data.summary.replace(/\n/g, "<br />"));
      setLoading(false);
    } catch (error) {
      setLoading(false);

      notifications.show({
        id: "error",
        withCloseButton: true,
        title: "Transcription and summarization failed",
        message: "Please try again later",
        color: "red",
        icon: <IconX />,
        loading: false,
      });
    }
  };

  return (
    <>
      <HeadingSection title="Transcription" description="Transcribe a video" />

      <Button loading={loading} onClick={handleTranscribeAndSummarize}>
        Transcribe & summarize
      </Button>
      <p
        className="text-gray-700 dark:text-gray-400 text-lg font-normal mb-4 mt-4"
        dangerouslySetInnerHTML={{
          __html: transcription || "Transcription...",
        }}
      />
      <hr />
      <p
        className="text-gray-700 dark:text-gray-400 text-lg font-normal mb-4 mt-4"
        dangerouslySetInnerHTML={{ __html: summary || "Summary..." }}
      />
    </>
  );
};

export default Transcription;
Transcription.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
