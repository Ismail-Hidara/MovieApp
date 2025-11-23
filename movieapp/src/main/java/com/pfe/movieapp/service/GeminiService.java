package com.pfe.movieapp.service;

import com.google.gson.*;
import com.pfe.movieapp.dto.ChatRequest;
import com.pfe.movieapp.dto.ChatResponse;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Objects;
import java.util.logging.Logger;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final String MODEL = "models/gemini-2.0-flash";
    private static final String URL = "https://generativelanguage.googleapis.com/v1beta/";

    private final OkHttpClient httpClient = new OkHttpClient();
    private final Gson gson = new Gson();
    private final Logger logger = Logger.getLogger(GeminiService.class.getName());

    public ChatResponse getGeminiReply(ChatRequest request) {
        String replyText = askGeminiWithHistory(request);
        return new ChatResponse(replyText);
    }

    private String buildPrompt(String userMessage) {
        return """
                **Role & Purpose:**
                You are a **highly specialized entertainment assistant** exclusively focused on movies, TV shows, anime, and manga. Your expertise includes:
                - **Recommendations**: Suggest titles based on genre, mood, story elements, or user preferences.
                - **Deep Dive Analysis**: Compare plots, themes, or artistic styles (e.g., "Like *Inception* but with anime visuals").
                - **Discovery Help**: Find hidden gems or niche content (e.g., "Psychological thrillers with unreliable narrators").
                - **Trends & Updates**: Share upcoming releases or industry news if asked.
            
                **Interaction Style:**
                1. **Engaging & Enthusiastic**: Use phrases like *"Great choice!"* or *"If you loved [X], you’ll adore [Y]!"* to keep it conversational.
                2. **Precision**: Always ask clarifying questions if requests are vague (e.g., *"Do you prefer dark fantasy or lighthearted adventure anime?"*).
                3. **Unique Flair**: Avoid generic replies. Instead of *"I can assist with that,"* say:
                   - *"Let’s uncover your next obsession! Tell me—craving mind-bending sci-fi or heartwarming slice-of-life?"*
                   - *"Ah, a fan of [genre]? I’ve got 3 wildcard picks you might’ve missed!"*

                **Rules:**
                - **Stay On-Topic**: If asked unrelated questions, politely redirect: *"I’m your entertainment guru! Ask me about shows, films, or manga :)"*
                - **Spoiler-Free**: Never reveal major plot points unless the user requests it.
                - **Personalize**: Adapt to the user’s tone (e.g., emojis if they use them, or detailed analysis for serious requests).

                **Example Outputs:**
                *"You enjoyed *Parasite*? Try *The Platform* (film) or *Death Note* (anime)—both explore societal divides with a sinister twist!"*
                *"Want a manga with intricate world-building? *Made in Abyss* blends adventure with haunting lore. Or *Berserk* for dark fantasy."*

                **Final Note:**
                Your goal is to make discovering entertainment **fun, tailored, and insightful**. Be the guide who helps users find *exactly* what resonates with them! 

            **Now, the user says:**  
            %s
            """.formatted(userMessage);
    }

    private String askGeminiWithHistory(ChatRequest request) {
        String endpoint = URL + MODEL + ":generateContent?key=" + geminiApiKey;
        JsonArray contentsArray = new JsonArray();

        // Include past history if present
        if (request.getHistory() != null) {
            for (ChatRequest.ChatMessage msg : request.getHistory()) {
                JsonObject part = new JsonObject();
                part.addProperty("text", msg.getContent());

                JsonObject content = new JsonObject();
                content.add("parts", gson.toJsonTree(new JsonObject[]{part}));
                content.addProperty("role", msg.getRole()); // "user" or "assistant"

                contentsArray.add(content);
            }
        }

        // Append current user message with prompt
        JsonObject part = new JsonObject();
        part.addProperty("text", buildPrompt(request.getMessage()));

        JsonObject currentContent = new JsonObject();
        currentContent.add("parts", gson.toJsonTree(new JsonObject[]{part}));
        currentContent.addProperty("role", "user");

        contentsArray.add(currentContent);

        JsonObject requestBody = new JsonObject();
        requestBody.add("contents", contentsArray);

        Request requestObj = new Request.Builder()
                .url(endpoint)
                .post(RequestBody.create(
                        gson.toJson(requestBody),
                        MediaType.parse("application/json")
                ))
                .build();

        try (Response response = httpClient.newCall(requestObj).execute()) {
            if (!response.isSuccessful()) {
                logger.warning("Gemini API error code: " + response.code());
                return "❌ Failed to get a response: " + response.code();
            }

            String responseBody = Objects.requireNonNull(response.body()).string();
            JsonObject json = gson.fromJson(responseBody, JsonObject.class);

            return json.getAsJsonArray("candidates")
                    .get(0).getAsJsonObject()
                    .get("content").getAsJsonObject()
                    .getAsJsonArray("parts")
                    .get(0).getAsJsonObject()
                    .get("text").getAsString();

        } catch (IOException e) {
            logger.severe("Error calling Gemini API: " + e.getMessage());
            return "❌ An error occurred while calling Gemini.";
        }
    }
}
