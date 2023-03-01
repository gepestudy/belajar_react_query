import MyAppshell from "@/src/components/layouts/AppShell";
import LoadingHome from "@/src/components/loadings/LoadingHome";
import { Center, Container } from "@mantine/core";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

const slug = () => {
  const {
    query: { slug },
  } = useRouter();

  const slugQuery = useQuery<{ data: Post }, AxiosError>({
    queryKey: ["posts", slug],
    queryFn: (obj) => getPostBySlug(obj.queryKey[1]),
    enabled: !!slug,
  });

  console.log({ slugQuery });

  return (
    <>
    <Head>
      <title>{slugQuery.data?.data.title}</title>
    </Head>
    <MyAppshell>
      <Container>
        {slugQuery.isLoading && <LoadingHome />}
        {slugQuery.isError && <p>{slugQuery.error.message}</p>}
        <Center>
          <p className="text-3xl font-medium">{slugQuery.data?.data.title}</p>
        </Center>
        <Center>
          <p className="text-xl font-semibold italic">
            {slugQuery.data?.data.author}
          </p>
        </Center>
        <Center mt={"xl"}>
          <p>{slugQuery.data?.data.body}</p>
        </Center>
      </Container>
    </MyAppshell>
    </>
  );
};

export default slug;
async function getPostBySlug(
  slug: string | string[] | undefined | unknown
): Promise<{ data: Post }> {
  const { data } = await axios.get<{ data: Post }>(`/api/posts/${slug}`);
  return data;
}
