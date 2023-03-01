import {
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Text,
} from "@mantine/core";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React from "react";
import LoadingHome from "../loadings/LoadingHome";

const Posts = () => {
  const postQuery = useQuery<Post[], AxiosError>({
    queryKey: ["post"],
    queryFn: getPost,
  });
  return (
    <div>
      {postQuery.isLoading && <LoadingHome />}
      {postQuery.isError && <p>{postQuery.error.message}</p>}
      {postQuery.data?.length == 0 && (
        <Center>
          <Text>data post belum ada</Text>
        </Center>
      )}
      {postQuery.data && (
        <>
          <Container>
            <Grid justify={"center"}>
              {postQuery.data.map((post: Post) => (
                <Grid.Col md={12} lg={4} key={post.id}>
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Group position="apart" mt="md" mb="xs">
                      <Text weight={500}>{post.title}</Text>
                    </Group>

                    <Text size="sm" color="dimmed" truncate={"end"}>
                      {post.body}
                    </Text>

                    <Button
                      variant="light"
                      color="blue"
                      fullWidth
                      mt="md"
                      radius="md"
                      component={Link}
                      href={`/post/${post.slug}`}
                    >
                      Read More
                    </Button>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default Posts;

async function getPost(): Promise<Post[]> {
  const { data } = await axios.get<Post[]>("/api/posts");
  return data;
}
