import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { requireAuthentication } from "@/utils/requireAuthentication";
import {
  Box,
  Button,
  Divider,
  MultiSelect,
  NumberInput,
  Radio,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  categoryOptions,
  conditionOptions,
  provinceOptions,
  tagsOptions,
} from "../../components/data/formData";
import { NextPageWithLayout } from "../page";

interface CreateNewAdProps {
  apiUrl: string;
}

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

const CreateNewAd: NextPageWithLayout<CreateNewAdProps> = ({ apiUrl }) => {
  const [tagsSearchValue, onSearchChange] = useState("");

  const router = useRouter();

  const form = useForm({
    initialValues: {
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
    },
  });

  const handleFormSubmit = async (data: any, event: React.FormEvent) => {
    event.preventDefault();

    // Refactpr the data to be in the format we want to send to the API
    const { streetAddress, city, province, postalCode, ...restData } = data;
    const location = `${streetAddress}, ${city}, ${province}, ${postalCode}`;
    const newData = { ...restData, location };

    // Convert "yes" or "no" to true or false
    newData.canDeliver = newData.canDeliver === "yes";

    // Send the data to the API
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to create listing", error);
    }
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <h2 className="text-xl font-semibold leading-7 text-gray-900 mt-8 md:mt-16 sm:mt-16">
          Listing Details
        </h2>
        <p className="mt-1 mb-4 text-sm leading-6 text-gray-600">
          Please provide your listing/ad details
        </p>
        {/* Name */}
        <TextInput
          label="Title"
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
          limit={5}
        />

        <Divider mb={"xl"} mt={"xl"} />
        <h2 className="text-xl font-semibold leading-7 text-gray-900">
          Pickup / meeting address
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Provide an address where you and the buyer can meet for item handover
          and payment. We suggest a public location, such as a local Tim
          Horton&apos;s or a mall.
        </p>
        {/* Street address */}
        <TextInput
          label="Street Address"
          placeholder="123 Main St"
          name="streetAddress"
          {...form.getInputProps("streetAddress")}
          required
          mt="md"
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "md",
            width: "100%",
          }}
        >
          {/* City */}
          <TextInput
            label="City"
            placeholder="Scarborough"
            name="city"
            {...form.getInputProps("city")}
            required
            mt="md"
            mr={"md"}
            maw={400}
          />

          {/* Province */}
          <Select
            label="Province"
            placeholder="Select"
            name="province"
            {...form.getInputProps("province")}
            maw={400}
            required
            mt="md"
            data={provinceOptions}
          />
        </Box>

        {/* Postal code */}
        <TextInput
          label="Postal Code"
          placeholder="A1A1A1"
          name="postalCode"
          {...form.getInputProps("postalCode")}
          maxLength={6}
          required
          mt="md"
          maw={400}
          description="6 digit postal code"
        />
        {/* Buttons */}
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateNewAd;

CreateNewAd.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
