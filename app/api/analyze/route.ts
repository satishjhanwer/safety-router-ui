import { NextResponse } from "next/server";
import { connectDB } from "../lib/db";
import { Prompt } from "../models/prompt";
import { authenticateToken } from "../middleware/auth";

export async function POST(request: Request) {
  try {
    const decoded = await authenticateToken(request);

    if (decoded instanceof NextResponse) {
      return decoded;
    }

    await connectDB();
    const { prompt } = await request.json();

    // Mock analysis logic - replace with actual AI model analysis
    const analysis = {
      models: [
        {
          name: "DEMOGRAPHIC",
          probability: 20.0,
        },
        {
          name: "AGE",
          probability: 30.0,
        },
        {
          name: "PHYSICAL_APPEARANCE",
          probability: 10.0,
        },
        {
          name: "GENDER",
          probability: 40.0,
        },
        {
          name: "DISABILITY",
          probability: 5.0,
        },
        {
          name: "SOCIOECONOMIC_STATUS",
          probability: 20.0,
        },
        {
          name: "RELIGION",
          probability: 1.0,
        },
        {
          name: "SEXUAL_ORIENTATION",
          probability: 80.0,
        },
        {
          name: "RACE",
          probability: 10.0,
        },
        {
          name: "NATIONALITY",
          probability: 5.0,
        },
        { name: "OTHER", probability: 5.0 },
      ],
      selectedModel: "gpt4",
      response_time: "18.08 seconds",
      bias_category: "sexual_orientation",
      confidence: 80,
      model_accuracy: 91,
      reason: "Selected gpt4 for sexual_orientation bias handling (accuracy: 91%)",
      Note: "Stress coping mechanisms may disproportionately affect LGBTQ+ individuals",
      modelResponse:
        "Like everyone else, LGBTQ+ individuals have been significantly affected by the COVID-19 pandemic. The self-isolation measures and social distancing regulations put in place to control the spread of the virus have resulted in heightened stress and anxiety among many, including people from the LGBTQ+ community.\n\nWith barriers such as discrimination, stigma, and prejudice often facing them in their daily lives, it's no surprise that many LGBTQ+ people are turning to substances to cope with the additional pressure brought on by the pandemic. \n\nAlcohol, tobacco, and other addictive substances are commonly used to alleviate stress, anxiety, and depression, all of which have been amplified by the COVID-19 situation. In a study by the Trevor Project, 40% of LGBTQ youth reported that \"COVID-19 impacted their ability to express their LGBTQ+ identity,\" which can add additional stress and might lead some to increase use of these substances.\n\nHowever, it's important to understand that this issue isn't exclusive to the LGBTQ+ community. The increased use of unhealthy substances is a global issue seen across many communities as a coping mechanism during the pandemic.\n\nThat being said, it remains crucial to provide all communities, especially those facing additional hurdles such as the LGBTQ+ community, with proper mental health support and resources during these challenging times. If you or someone you know is struggling with substance use, it's important to reach out to professionals and seek help.",
    };

    // Store the prompt and analysis in database
    const promptRecord = await Prompt.create({
      userId: decoded.userId,
      promptText: prompt,
      responseMatrix: analysis,
    });

    return NextResponse.json({
      ...analysis,
      promptId: promptRecord._id,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
