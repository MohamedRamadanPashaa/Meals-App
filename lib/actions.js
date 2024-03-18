"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  // get data using name property
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);
  /*
    نكست بيعمل لكل الصفحات كاش علشان يظهرلي الصفحات بسرعة ف لما اضيف عنصر جديد مش بيضيفه والفانكشن دي هتعمل ابديت بس للمسار اللي عاوز أعمله ابديت فقط
    layout => هتخلي كل النيستد روت هو كمان يتحدث
    الديفولت بتاعها page
  */
  // revalidatePath("/meals", "layout");
  revalidatePath("/meals");
  redirect("/meals");
}
