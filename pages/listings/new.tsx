import { useState } from "react";
import { useRouter } from "next/router";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { GetServerSideProps } from "next";
import { FC } from "react";

interface CreateNewAdProps {
  apiUrl: string;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const host = context.req.headers["host"];
    const apiUrl = `${protocol}://${host}/api/listings/createNewListing`;
    return {
      props: { apiUrl },
    };
  });
};

const CreateNewAd: FC<CreateNewAdProps> = ({ apiUrl }) => {
  const [formData, setFormData] = useState({
    name: "a",
    description: "a",
    condition: "NEW",
    price: 3,
    images: [],
    location: "a",
    tags: "a, b, c",
    categoryId: "clgjpntfa0000r9w30ro7ppjy",
  });

  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      ...formData,
      tags: formData.tags.split(",").map((tag: string) => tag.trim()),
    };

    console.log("Data from client", data);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to create ad", error);
    }
  };

  return (
    <div>
      <h1>Create a new ad</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="condition">Condition:</label>
        <select
          id="condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
        >
          <option value="NEW">New</option>
          <option value="USED">Used</option>
          <option value="OPEN_BOX">Open Box</option>
          <option value="OPEN_BUT_NEVER_USED">Open but never used</option>
        </select>

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="tags">Tags (separated by comma):</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          required
        />

        <label htmlFor="categoryId">Category ID:</label>
        <input
          type="text"
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateNewAd;
