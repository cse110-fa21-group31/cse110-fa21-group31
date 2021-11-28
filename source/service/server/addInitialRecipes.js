import { createRecipe } from "./interface.mjs";

import Datastore from "nedb";
const RECIPE_DB_PATH = "source/service/.data/recipes"
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });

let recipes = [
    {
        name: "Pumpkin Pie",
        author: "MMAfv3oCQDiL4u10",
        description: "The perfect ending to a Thanksgiving feast!",
        datePosted: Date(),
        servingSize: 8,
        image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/3/6/0/RF0104_From-Scratch-Pumpkin-Pie_s4x3.jpg.rend.hgtvcom.616.462.suffix/1433678596474.jpeg",
        tags: ["Dessert", "Seasonal"],
        cookTime: "55 mins",
        difficulty: "2 star",
        ingredients: ["1 (15 ounce) can pumpkin", "1 (14 ounce) can sweetened ondensed milk", "2 large eggs", "1 teaspoon ground cinnamon", "1/2 teaspoon ground ginger", "1/2 teaspoon ground nutmeg", "1/2 teaspoon salt", "1 (9 inch) unbaked pie crust"],
        steps: ["Preheat oven to 425 degrees F. Whisk pumpkin, sweetened condensed milk, eggs, spices and salt in medium bowl until smooth. Pour into crust. Bake 15 minutes.", "Reduce oven temperature to 350 degrees F and continue baking 35 to 40 minutes or until knife inserted 1 inch from crust comes out clean. Cool. Garnish as desired. Store leftovers covered in refrigerator."]
    },
    {
        name: "Chicken Stir Fry",
        author: "MMAfv3oCQDiL4u10",
        description: "This chicken and vegetable stir fry will become your easy go-to dinner. You will wow your guests and family alike, even the picky eaters with approve!",
        datePosted: Date(),
        servingSize: 4,
        image: "https://www.chelseasmessyapron.com/wp-content/uploads/2019/06/Chicken-Stir-Fry-5.jpg",
        tags: ["Asian", "Main course"],
        cookTime: "15 mins",
        difficulty: "2 star",
        ingredients: ["1 lb chicken thighs, cut into bite-sized pieces", "1/2 zucchini, sliced or cubed", "2 Tbsp oil, divided", "1 Tbsp butter", "1 cup broccoli, cut into florets", "1 small carrot, julienned or cubed", "8 oz mushrooms, sliced", "1/2 red pepper, cubed", "4 garlic cloves, minced", "1 tsp fresh ginger, minced", "1/2 onion, cubed", "½ cup cashews", "1/2 cup chicken broth", "1/4 cup water", "1/4 cup soy sauce", "2 Tbsp honey", "1 Tbsp cornstarch"],
        steps: ["Trim chicken thighs of excess fat and cut into bite-sized pieces. Cut the vegetables into even-sized pieces (about the same size as the chicken pieces).", "For the sauce, combine chicken broth, water, soy sauce, honey, and cornstarch in a bowl.", "In a large pan (or wok), on med/high heat, heat 1 Tbsp oil. Once oil is hot, add chicken in a single layer. Cook chicken until browned, mixing as needed. Once cooked, remove chicken from pan and set aside.", "Add the remaining oil and the butter to skillet with the broccoli, zucchini, mushrooms, red peppers, onion, and carrots. Cook until vegetables are crisp tender, mixing frequently.", "Add chicken back to the pan. Add the garlic and ginger and cook 1 minute, stirring frequently.", "Add the cashews then pour the sauce into the pan and bring to a boil. Turn down heat and let stir fry simmer until the sauce thickens and is well incorporated with the remaining ingredients. Garnish with green onion and sesame seed before serving if desired."]
    },
    {
        name: "Chicken Fajitas",
        author: "MMAfv3oCQDiL4u10",
        description: "Chicken fajitas are an easy and flavorful weeknight meal.",
        datePosted: Date(),
        servingSize: 6,
        image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/02/Chicken-Fajitas-7.jpg",
        tags: ["Mexican", "Main course"],
        cookTime: "60 mins",
        difficulty: "2 star",
        ingredients: ["1/2 c. plus 1 tbsp. extra-virgin olive oil", "1/4 c. lime juice, from about 3 limes", "2 tsp. cumin", "1/2 tsp. crushed red pepper flakes", "1 lb. boneless skinless chicken breasts", "Kosher salt", "Freshly ground black pepper", "2 bell peppers, thinly sliced", "1 large onion, thinly sliced", "Tortillas, for serving"],
        steps: ["In a large bowl, whisk together 1⁄2 cup oil, lime juice, cumin, and red pepper flakes. Season chicken with salt and pepper, then add to bowl and toss to coat. Let marinate in the fridge at least 30 minutes and up to 2 hours.", "When ready to cook, heat remaining tablespoon oil in a large skillet over medium heat. Add chicken and cook until golden and cooked through, 8 minutes per side. Let rest 10 minutes, then slice into strips.", "Add bell peppers and onion to skillet and cook until soft, 5 minutes. Add chicken and toss until combined. Serve with tortillas."]
    },
]

await createRecipe(recipes[2], recipeDB);

// for (let recipe in recipes) {
//     await createRecipe(recipe, recipeDB);
// }