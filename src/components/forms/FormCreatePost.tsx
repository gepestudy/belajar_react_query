import {
  Button,
  Group,
  Input,
  Loader,
  Modal,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Post } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const FormCreatePost = () => {
  const [opened, setOpened] = useState(false);
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) => {
      return createPostFn({ title, body, author });
    },
    onSuccess: () => {
      setOpened(false);
      queryClient.invalidateQueries(["post"]).finally(() => {
        setBody("");
        setTitle("");
      });
      showNotification({
        id: "success-create-post",
        title: "new post added!",
        message: "Hey there, your post is awesome! 🤥",
        color: "green",
      });
    },
    onError: (e: AxiosError<{ message: string }>) => {
      showNotification({
        id: "failed-create-post",
        title: "failed to add post!",
        message: `${e.response?.data.message!} 🙏`,
        color: "red",
      });
    },
  });

  const handleSubmit = () => {
    createPostMutation.mutate({ title, body });
  };
  return (
    <>
      <Button onClick={() => setOpened(true)}>create new post</Button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div>
          <TextInput
            label="Author"
            placeholder="your name"
            onChange={(e) => setAuthor(e.target.value)}
            withAsterisk
            autoFocus
          />
          <Space h={"lg"} />
          <TextInput
            label="post title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            withAsterisk
            autoFocus
          />
          <Space h={"lg"} />
          <Textarea
            label="post body"
            placeholder="body"
            onChange={(e) => setBody(e.target.value)}
            withAsterisk
          />
          <Space h="lg" />
          <Group position="right">
            <Button>Cancel</Button>
            <Button
              color={"green"}
              onClick={handleSubmit}
              disabled={createPostMutation.isLoading}
            >
              {createPostMutation.isLoading && <Loader />}
              Submit
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default FormCreatePost;

async function createPostFn({
  title,
  body,
  author,
}: {
  title: string;
  body: string;
  author: string;
}): Promise<any> {
  const { data } = await axios.post("/api/posts", { title, body, author });
  return data;
}
