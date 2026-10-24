import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const meta = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    as: "article",
    children: (
      <>
        <CardHeader>
          <CardTitle>Quiet by default</CardTitle>
          <CardDescription>A card groups related content without adding noise.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Body content sits between the header and the footer.</p>
        </CardContent>
        <CardFooter>
          <span>Updated today</span>
        </CardFooter>
      </>
    ),
  },
  decorators: [(Story) => <div style={{ maxWidth: "26rem" }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Surface: Story = { args: { variant: "surface" } };

export const Small: Story = { args: { size: "sm", variant: "surface" } };

export const WithAction: Story = {
  args: {
    variant: "surface",
    children: (
      <>
        <CardHeader>
          <CardTitle>Release notes</CardTitle>
          <CardDescription>What changed in this version.</CardDescription>
          <CardAction>
            <Button size="sm" variant="secondary">Share</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>New Card parts and a single spacing token.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithImage: Story = {
  args: {
    variant: "surface",
    children: (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element -- Card styles the first <img> as full-bleed media. */}
        <img src="/window.svg" alt="" width="640" height="360" />
        <CardHeader>
          <CardTitle>Image first</CardTitle>
          <CardDescription>The first image is full-bleed with rounded top corners.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No separate media component is needed.</p>
        </CardContent>
      </>
    ),
  },
};

export const CustomSpacing: Story = {
  args: {
    variant: "surface",
    style: { "--card-spacing": "var(--space-3)" } as CSSProperties,
  },
};

export const Dark: Story = { args: { variant: "surface" }, globals: { theme: "dark" } };

export const Light: Story = { args: { variant: "surface" }, globals: { theme: "light" } };
