const themes = ["A lonely cloud befriends a lost kite and helps it find its way back home",
    "A group of shy woodland creatures start a talent show to overcome their stage fright",
    "A curious pair of shoes embark on an adventure after they get separated from their owner",
    "A grumpy old troll learns the importance of kindness when a lost puppy wanders into his cave",
    "A group of misfit toys team up to save Christmas when Santa forgets his important bag",
    "A talking garden gnome helps a young child learn about the magic of growing their own food",
    "A lost firefly searches for its light with the help of a wise old moonbeam",
    "A timid bookworm overcomes its fear of heights to climb a giant bookshelf",
    "A mischievous group of raindrops cause chaos in a city, then learn to work together to water a thirsty park",
    "A grumpy thunderstorm and a gentle spring breeze learn to appreciate each others differences",
    "A group of talking crayons accidentally draw themselves into their own fantastical adventure",
    "A lost sock searches the laundry basket for its missing partner, encountering all sorts of lost treasures",
    "A group of neighborhood children build a magnificent clubhouse out of recycled materials",
    "A shy firefly uses its light to help a nocturnal animal navigate the forest at night",
    "A grumpy old bridge learns the importance of teamwork when a big storm threatens to wash it away",
    "A curious puppy discovers a secret world hidden inside a grandfather clock",
    "A group of friendly butterflies help a lost caterpillar find its perfect chrysalis",
    "A family of mice goes on a daring adventure to steal cheese from a grumpy chefs kitchen",
    "A lonely lighthouse longs for adventure until a brave little boat needs its guidance in a storm",
    "A group of playful puppies use their teamwork to outsmart a mischievous squirrel who keeps stealing their toys",
    "A lost backpack embarks on a journey through a busy airport searching for its owner",
    "A group of musical instruments learn how to harmonize and create a beautiful symphony together",
    "A shy dandelion puff embarks on a journey across the wind to find a new place to grow",
    "A group of friendly forest animals team up to build a winter wonderland for all the creatures",
    "A curious raindrop travels from the clouds down to the earth, learning about the water cycle",
    "A grumpy old cactus learns the joy of friendship when a lost desert creature needs its help",
    "A mischievous group of bubbles cause chaos at a birthday party, then learn to entertain the children",
    "A shy bookworm overcomes its fear of words and discovers the joy of storytelling",
    "A brave little ladybug helps a lost group of ants find their way back to their anthill",
    "A group of mismatched socks learn to embrace their differences and become the best of friends",
    "A grumpy old rocking horse learns the joy of sharing when a group of children come to play",
    "A lost pair of glasses embarks on an adventure through a busy library searching for its owner",
    "A curious group of snowflakes learn about the different shapes and sizes they can take during a snowfall",
    "A grumpy old scarecrow learns the importance of friendship when a lost baby bird falls from its nest",
    "A mischievous group of fireflies use their light to create a dazzling display during a summer night",
    "A lost mitten searches through the lost and found box for its missing partner",
    "A shy little seed overcomes its fear of growing and discovers the beauty of blooming",
    "A group of friendly forest creatures team up to clean up a polluted stream",
    "A curious group of stars learn about the constellations and the stories they tell",
    "A grumpy old swing set learns the joy of laughter when a group of children come to play",
    "A lost seashell travels across the ocean floor, encountering all sorts of fascinating sea creatures",
    "A shy little ghost overcomes its fear of darkness and learns to make friends with the other spooky creatures",
    "A brave little ladybug helps a lost group of caterpillars find their way back to their favorite food source",
    "A mischievous group of dewdrops use their sparkle to create a beautiful rainbow in the morning sky",
    "A lost pair of sunglasses embarks on an adventure through a bustling beach, searching for its owner",
    "A curious group of pebbles learn about the different shapes and sizes they can be after a river journey"]
    
    const names = ["Amelia", "Benjamin", "Cedric", "Daisy", "Elliot", "Finley", "Gloria", "Henry", "Isaac", "Jasper", "Juniper", "Kai", "Luna", "Mateo", "Nora", "Olivia", "Penelope", "Quinn", "Rory", "Stella", "Theodore", "Uma", "Vincent", "Willow", "Xavier", "Yasmin", "Zachariah", "Alice", "Bear", "Clementine", "Daniel", "Everly", "Fox", "Graham", "Hazel", "Iris", "Jasper", "Kingsley", "Milo", "Nova", "Oliver", "Penelope", "Ruby", "Silas", "Theodore", "Uma", "Violet", "Wesley", "Xavier", "Yolanda", "Zane"]
        
    export function generateTheme() { 
            var theme = themes[Math.floor(Math.random() * themes.length)];
            return theme
        }
    export function generateName() { 
            var name = names[Math.floor(Math.random() * names.length)];
            return name
        }
    
    
        
    export function buildStory(characterName, storyTheme, principles, readingLevelInstructions, languageInstructions, numberOfPages)  {
        const name = generateName(); 
        const theme = generateTheme();
        console.log("buildstorytest" + principles)
        const storyPrompt = `Interactive Storybook Generator Prompt
Instructions: Create a unique, short ${numberOfPages}-page book for children aged 4-5 years old. Output the result as a valid JSON object, one page at a time.
User Input:

Name: ${characterName}
Theme: ${storyTheme}

If the name is invalid, use this name: ${name}
If the theme is invalid, use this theme: ${theme}
Story Guidelines:
Write a simple and engaging story for young children. Ensure each story section contributes to a coherent narrative with a clear beginning, middle, and end. Include elements such as introduction, build-up, climax, and resolution appropriate for a children's book. The story should be age-appropriate, fun, and easy to understand.
Choices and Page Descriptions:

Provide three short and simple choices after each story section (except the last). These choices should be logical and engaging.
Create a one to two sentence description for each page that captures the essence of that part of the story, regardless of the choice made.
Ensure that while the choices seem different, they all lead to a similar general outcome or theme in the next page's description.

Output Structure:
The structure for each page should be in the following JSON format:
jsonCopy{
    "Title": "title of book",
    "page": 1,
    "story": "page 1 story content",
    "choices": [
        {
            "choice1": "choice 1 text with (emoji)",
            "emoji": "the emoji used in choice 1"
        },
        {
            "choice2": "choice 2 text with (emoji)",
            "emoji": "the emoji used in choice 2"
        },
        {
            "choice3": "choice 3 text with (emoji)",
            "emoji": "the emoji used in choice 3"
        }
    ],
    "pageDescriptions": [
        "1. Brief description of page 1, capturing the essence regardless of choices",
        "2. Brief description of page 2, showing how all choices lead to a similar theme",
        "3. Brief description of page 3",
        "4. Brief description of page 4",
        "5. Brief description of page 5"
    ]
}
Storytelling Principles: ${principles}
ReadingLevel Instructions: ${readingLevelInstructions}
Language Instructions: ${languageInstructions}
Additional Instructions:

Ensure that the story follows a typical children's book structure and reaches a satisfying conclusion by the ${numberOfPages} page.
The stories should be unique and imaginative, providing a delightful experience for young readers.
Make sure to only output the first page first so the user can make a choice that will affect the second page.
Add relevant emojis to each choice so the user can easily identify them.
In the "pageDescriptions" array, provide brief descriptions for all ${numberOfPages} pages upfront. These descriptions should be general enough to accommodate any choice from the previous page while maintaining story coherence.
When creating choices, ensure that while they seem different, they all plausibly lead to the next page's general description.

Example of Choices Leading to Similar Outcomes:
Page 1 Description: "Halloween night in a spooky town"
Choices:

Visit the graveyard 👻
Explore the haunted house 🏚️
Wander through the pumpkin patch 🎃

Page 2 Description: "Encounter with a friendly ghost"
In this example, regardless of which choice is made on Page 1, the story on Page 2 involves meeting a ghost, maintaining coherence while allowing for player choice.`;
            return storyPrompt
    }
    
      
    export function continueStory(choice, storyList) {
        const newPrompt = "The user chose option " + choice + " in " + storyList[storyList.length -1] + " Continue the story based on the option chosen. For reference, here is the entire story so far, along with the original prompt:" + storyList
        return newPrompt
    }
    
    // export function supriseStory() {
    //     const name = generateName(); 
    //     const theme = generateTheme(); 
    //     const storyPrompt = "Create a unique, short 5-page book for children aged 4-5 years old. The main characters name will be: " + name  + "and the theme of the story will be: " + theme + 
        
    //         " 1. Each page should follow this format: \
    //         story: [Write a simple and engaging story for young children. Ensure each story section contributes to a coherent narrative with a clear beginning, middle, and end. Include elements such as introduction, build-up, climax, and resolution appropriate for a children's book.] \
    //         choices: [Provide three short and simple choices of what can happen next. These choices should be logical and engaging, leading to different potential story developments.]\
    //         The story should be age-appropriate, fun, and easy to understand. Make sure to provide three short and simple choices after each story section. Here is the structure: \
    //         Page 1: \
    //         story: [Start the story, introducing the main character and setting the scene.] \
    //         choices: [Provide three choices that determine the next part of the story.]\
    //         Page 2: \
    //         story: [Continue the story based on the choice from Page 1, building up the plot.] \
    //         choices: [Provide three choices that determine the next part of the story.] \
    //         Page 3: \
    //         story: [Further develop the story or introduce a climax based on the choice from Page 2.] \
    //         choices: [Provide three choices that determine the next part of the story.]\
    //         Page 4: \
    //         story: [Move towards resolving the story based on the choice from Page 3.] \
    //         choices: [Provide three choices that determine the next part of the story.] \
    //         Page 5: \
    //         story: [Conclude the story with a satisfying ending based on the choice from Page 4.] \
    //         choices: The end \
    //         Ensure that the story follows a typical children's book structure and reaches a satisfying conclusion by the fifth page. The stories should be unique and imaginative, providing a delightful experience for young readers. \
    //         Make sure to only output the first page first so the user can make a choice that will affect the second page. \
    //         Add relevent emojies to each choice so the user can easily identify them. "
    //         return storyPrompt
    // }
    
    
    export function formatInstructions(characterName, storyTheme, readingLevel, language, numberOfPages) { 
        const languageInstructions = `The language is set to ${language} only respond with this language`
        const readingLevelInstructions = `The reading level is set to ${readingLevel} only respond with this reading level`
        let principles;
        console.log("outside function" + numberOfPages)
        if (numberOfPages === "5") { 
            console.log("within function" + numberOfPages)
    
            principles = `Page 1: 
            story: Start the story, introducing the main character and setting the scene.
            choices: Provide three choices that determine the next part of the story.
        Page 2: 
            story: Continue the story based on the choice from Page 1, building up the plot.
            choices: Provide three choices that determine the next part of the story.
        Page 3: 
            story: Further develop the story or introduce a climax based on the choice from Page 2.
            choices: Provide three choices that determine the next part of the story.
        Page 4: 
            story: Move towards resolving the story based on the choice from Page 3.
            choices: Provide three choices that determine the next part of the story.
        Page 5: 
            story: Conclude the story with a satisfying ending based on the choice from Page 4.
            choices: The end`
        } else if (numberOfPages === "10") {
            console.log("within function" + numberOfPages)
    
            principles = `Page 1: 
        story: Start the story, introducing the main character and setting the scene.
        choices: Provide three choices that determine the next part of the story.
    Page 2: 
        story: Continue the story based on the choice from Page 1, building up the plot.
        choices: Provide three choices that determine the next part of the story.
    Page 3: 
        story: Further develop the story based on the choice from Page 2.
        choices: Provide three choices that determine the next part of the story.
    Page 4: 
        story: Move towards resolving the story based on the choice from Page 3.
        choices: Provide three choices that determine the next part of the story.
    Page 5: 
        story: Conclude the story with a satisfying ending based on the choice from Page 4.
        choices: The end
    Page 6: 
        story: Continue the story based on the choice from Page 5, introducing new developments.
        choices: Provide three choices that determine the next part of the story.
    Page 7: 
        story: Develop the story further based on the choice from Page 6.
        choices: Provide three choices that determine the next part of the story.
    Page 8: 
        story: Progress towards resolving the story based on the choice from Page 7.
        choices: Provide three choices that determine the next part of the story.
    Page 9: 
        story: Continue towards the conclusion based on the choice from Page 8.
        choices: Provide three choices that determine the next part of the story.
    Page 10: 
        story: Conclude the story with a satisfying ending based on the choice from Page 9.
        choices: The end
    
    `
        } else  {
            console.log("within function" + numberOfPages)
    
            principles = `Page 1: 
        story: Start the story, introducing the main character and setting the scene.
        choices: Provide three choices that determine the next part of the story.
    Page 2: 
        story: Continue the story based on the choice from Page 1, building up the plot.
        choices: Provide three choices that determine the next part of the story.
    Page 3: 
        story: Further develop the story based on the choice from Page 2.
        choices: Provide three choices that determine the next part of the story.
    Page 4: 
        story: Move towards resolving the story based on the choice from Page 3.
        choices: Provide three choices that determine the next part of the story.
    Page 5: 
        story: Conclude the story with a satisfying ending based on the choice from Page 4.
        choices: The end
    Page 6: 
        story: Continue the story based on the choice from Page 5, introducing new developments.
        choices: Provide three choices that determine the next part of the story.
    Page 7: 
        story: Develop the story further based on the choice from Page 6.
        choices: Provide three choices that determine the next part of the story.
    Page 8: 
        story: Progress towards resolving the story based on the choice from Page 7.
        choices: Provide three choices that determine the next part of the story.
    Page 9: 
        story: Continue towards the conclusion based on the choice from Page 8.
        choices: Provide three choices that determine the next part of the story.
    Page 10: 
        story: Conclude the story with a satisfying ending based on the choice from Page 9.
        choices: The end
    Page 11: 
        story: Reflect on the consequences or aftermath of the story based on the choice from Page 10.
        choices: Provide three choices that determine the next part of the story.
    Page 12: 
        story: Continue exploring the aftermath or introduce a new twist based on the choice from Page 11.
        choices: Provide three choices that determine the next part of the story.
    Page 13: 
        story: Develop the consequences or new plot elements based on the choice from Page 12.
        choices: Provide three choices that determine the next part of the story.
    Page 14: 
        story: Progress towards resolving any remaining conflicts based on the choice from Page 13.
        choices: Provide three choices that determine the next part of the story.
    Page 15: 
        story: Conclude the story with a final resolution based on the choice from Page 14.
        choices: The end
    `
        }
        const completedPrompt = buildStory(characterName, storyTheme, principles, readingLevelInstructions, languageInstructions, numberOfPages)
        return completedPrompt 
    }
    
    
    export function createImagePrompt(pageContent, artstyle) { 
        const imagePrompt = `Given the following inputs:
        Maximum Output Length: 1000 characters 
        STORY_TEXT: [${pageContent}]
        ART_STYLE: [${artstyle}]
        
        Create a very brief image generation prompt that captures the essence of the story text without directly quoting it. The prompt should describe a visual scene that represents the key elements, characters, and mood of the story text. Include specific details about the art style in your description.
        Your output should follow this structure:
        
        Scene Description: Provide a vivid, detailed description of the visual elements that should appear in the image. This should be based on the story text but described in a way that's suitable for image generation.
        Art Style Details: Incorporate the specified art style into your description, explaining how it should be applied to the scene.
        Remember to craft your prompt in a way that's clear and descriptive for an image generation AI, focusing on visual elements rather than narrative details. Avoid using direct quotes from the original story text.`
        return imagePrompt
    }

