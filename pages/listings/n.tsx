import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { requireAuthentication } from "@/utils/requireAuthentication";
import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Radio,
  Select,
  Stepper,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Category, Tag } from "@prisma/client";
import {
  IconCash,
  IconCircleCheck,
  IconId,
  IconMail,
  IconMapPin,
  IconPhoto,
} from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { conditionOptions } from "../../components/data/formData";
import { NextPageWithLayout } from "../page";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async () => {
    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const host = context.req.headers["host"];
    const apiUrl = `${protocol}://${host}/api/listings/createNewListing`;
    return {
      props: { apiUrl },
    };
  });
};

const NewListing: NextPageWithLayout = () => {
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 5 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active !== step;

  const [tagsSearchValue, onSearchChange] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [tagsOptions, setTagsOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const getCategoriesAndTags = async () => {
      const categoriesRes: AxiosResponse = await axios.get("/api/categories");
      const categories: Category[] = await categoriesRes.data;

      const tagsRes: AxiosResponse = await axios.get("/api/tags");
      const tags: Tag[] = await tagsRes.data;

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
    };

    getCategoriesAndTags();
  }, []);

  const form = useForm({
    initialValues: {
      files: [],
      name: "",
      description: "",
      condition: "",
      price: 0,
      images: [],
      streetAddress: "",
      city: "",
      province: "",
      postalCode: "",
      tags: [],
      canDeliver: "no",
      categoryId: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 8 ? "Title must be at least 8 characters" : null,
      description: (value) =>
        value.length < 20 ? "Description must be at least 20 characters" : null,
      condition: (value) =>
        !value ? "Please indicate the item's condition" : null,
      price: (value) => (value < 0.01 ? "Please enter a valid price" : null),
      tags: (value) =>
        value.length > 3 ? "Can't pick more than 3 tags" : null,
      streetAddress: (value) =>
        value.length < 1 ? "Street address is required" : null,
      city: (value) => (value.length < 1 ? "City is required" : null),
      province: (value) => (!value ? "Province is required" : null),
      postalCode: (value) =>
        value.length !== 6 ? "Postal code must be exactly 6 characters" : null,
      categoryId: (value) => (!value ? "Category is required" : null),
    },
  });

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        completedIcon={<IconCircleCheck />}
        breakpoint="sm"
      >
        <Stepper.Step
          icon={<IconId size="1.1rem" />}
          label="Step 1"
          description="Listing Details"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            <NumberInput
              label="Price"
              {...form.getInputProps("price")}
              mt="md"
              maw={400}
              name="price"
              defaultValue={0}
              required
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
            />
            <Radio mt={"xs"} value="free" label="Free" />
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
          </form>
        </Stepper.Step>
        <Stepper.Step
          icon={<IconPhoto size="1.1rem" />}
          label="Step 2"
          description="Media"
          allowStepSelect={shouldAllowSelectStep(1)}
        />
        <Stepper.Step
          icon={<IconMapPin size="1.1rem" />}
          label="Step 3"
          description="Location"
          allowStepSelect={shouldAllowSelectStep(2)}
        />
        <Stepper.Step
          icon={<IconCash size="1.1rem" />}
          label="Step 4"
          description="Price"
          allowStepSelect={shouldAllowSelectStep(3)}
        />
        <Stepper.Step
          icon={<IconMail size="1.1rem" />}
          label="Step 5"
          description="Contact"
          allowStepSelect={shouldAllowSelectStep(4)}
        />
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="apart" mt="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
        <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
      </Group>
    </>
  );
};

export default NewListing;

NewListing.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
