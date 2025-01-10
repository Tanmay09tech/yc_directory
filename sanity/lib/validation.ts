import { z } from "zod";

export const formSchema= z.object({
title: z.string().min(3).max(30),
description: z.string().min(10).max(1000),
category: z.string().min(3).max(20),
link: z.string().url(),
pitch:z.string(),
})