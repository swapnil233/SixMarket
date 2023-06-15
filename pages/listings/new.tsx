import { conditionOptions } from "@/components/data/formData";
import HeadingSection from "@/components/layout/heading/HeadingSection";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Radio,
  Select,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { Category, Condition, Tag } from "@prisma/client";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../page";

interface IFormValues {
  files: FileWithPath[];
  name: string;
  description: string;
  condition: Condition;
  price: number;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  tags: string[];
  canDeliver: string;
  categoryId: string;
}

const NewListing: NextPageWithLayout = () => {
  const [isFree, setIsFree] = useState<Boolean>(false);
  const [tagsSearchValue, onSearchChange] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [tagsOptions, setTagsOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Get categories and tags from the database.
  useEffect(() => {
    const getCategoriesAndTags = async () => {
      // Make the API calls in parallel.
      const [categoriesRes, tagsRes] = await Promise.all([
        axios.get("/api/categories"),
        axios.get("/api/tags"),
      ]);

      const categories: Category[] = categoriesRes.data;
      const tags: Tag[] = tagsRes.data;

      const newCategoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));

      const newTagsOptions = tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }));

      setCategoryOptions(newCategoryOptions);
      setTagsOptions(newTagsOptions);
      window.scrollTo(0, 0);
    };

    getCategoriesAndTags();
  }, []);

  const form = useForm<IFormValues>({
    initialValues: {
      files: [],
      name: "Test item",
      description: "lorem ipsum and all that stuff",
      condition: "NEW",
      price: 43,
      streetAddress: "123 Main Street",
      city: "Toronto",
      province: "Ontario",
      postalCode: "M1L4P2",
      tags: [
        "clgttgp8k0024r9rca5fymz8z",
        "clgttgqb6002ar9rcq6vh0wuf",
        "clgttgro6002kr9rcr7o7ku8m",
      ],
      canDeliver: "no",
      categoryId: "clgu9tb1p000wr9tjldwfwm3s",
    },
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>{`New Listing | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Create a new listing on Marketplace."
        />
        <meta property="og:title" content={`Categories | Marketplace`} />
        <meta
          property="og:description"
          content="Create a new listing on Marketplace."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketplace" />
      </Head>

      <HeadingSection
        title="Create a new listing"
        description="Complete the steps below to create a new listing."
      />

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Dropzone
          onDrop={(images) => {
            form.setFieldValue("files", images);
          }}
          onReject={(images) => console.log("rejected files", images)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          {...form.getInputProps("files")}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload size="3.2rem" stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size="3.2rem" stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
        {/* Name */}
        <TextInput
          label="Title"
          mt="md"
          placeholder="Used Nike shoes"
          name="title"
          {...form.getInputProps("name")}
          required
          maw={400}
        />
        {/* Description */}
        <Textarea
          label="Description"
          placeholder="Slightly used and worn it, perfect for runners!"
          name="description"
          {...form.getInputProps("description")}
          mt="md"
          minRows={4}
          required
        />
        {/* Category */}
        <Select
          label="Category"
          placeholder="Select"
          name="category"
          {...form.getInputProps("categoryId")}
          maw={400}
          required
          searchable
          nothingFound="No options"
          mt="md"
          data={categoryOptions}
        />
        {/* Condition */}
        <Select
          label="Condition"
          placeholder="Select"
          name="condition"
          {...form.getInputProps("condition")}
          maw={400}
          required
          mt="md"
          data={conditionOptions}
        />
        {/* Price */}
        <Group align="center" mt="md">
          <Radio
            mt={"xs"}
            value="free"
            checked={!isFree}
            onChange={() => setIsFree(false)}
          />
          <NumberInput
            label="Price"
            {...form.getInputProps("price")}
            maw={400}
            name="price"
            // @ts-ignore
            disabled={isFree}
            defaultValue={0}
            required
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
        </Group>

        {/* Free? */}
        <Radio
          mt={"xs"}
          value="free"
          label="Free"
          // @ts-ignore
          checked={isFree}
          onChange={() => setIsFree(true)}
        />

        {/* Can deliver? */}
        <Radio.Group
          label="Can you deliver this item?"
          {...form.getInputProps("canDeliver")}
          name="canDeliver"
          required
          mt={"md"}
        >
          <Radio mt={"xs"} value="yes" label="Yes" />
          <Radio mt={"xs"} value="no" label="No" />
        </Radio.Group>
        {/* Tags */}
        <MultiSelect
          label="Tags"
          placeholder="Select maximum 3 tags"
          {...form.getInputProps("tags")}
          name="tags"
          data={tagsOptions}
          searchable
          searchValue={tagsSearchValue}
          maxSelectedValues={3}
          maxDropdownHeight={160}
          maw={400}
          mt="md"
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
        />

        <Button type="submit" mt="md" onClick={() => handleSubmit}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default NewListing;

NewListing.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
