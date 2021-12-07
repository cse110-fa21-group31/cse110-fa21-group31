import { createRecipe } from "./interface.mjs";

import Datastore from "nedb";
const RECIPE_DB_PATH = "source/service/data/testrecipes";
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });


let sarahRecipe1 = {
    "name": "CRISP PANKO CHICKEN CUTLETS W/TONKATSU SAUCE",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Enjoy it",
    "datePosted": 1638172867145,
    "servingSize": 4,
    "image": "https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_721,h_406/v1/img/recipes/48/60/6/SPjdaJBSQ52c0Kbe0vsT_0S9A7403.jpg",
    "tags": ["Lunch", "Hard"],
    "cookTime": "37mins",
    "difficulty": "5 star",

    "ingredients": [
        {
            "boneless skinless chicken breast halves": 4
        },
        {
            "cup flour": 0.5
        },
        {
            "eggs, lightly whisked": 3
        },
        {
            "water": 1
        },
        {
            "cups japanese panko breadcrumbs": 2
        },
        {
            "head cabbage, shredded": 1
        }
    ],
    "steps": [
        "With a sharp knife, lightly score both sides of the chicken breasts in a checkerboard pattern.",
        "Lay a sheet of plastic wrap over the breasts and pound until they are about ½ inch thick.",
        "Season with salt and pepper.",
        "Dredge the chicken in the flour and then dip it in the beaten eggs, shaking to remove excess.",
        "Dip each piece in the flour and egg again an then coat the chicken in the panko.",
        "In a deep, straight sided sauté pan, heat about ¼ inch vegetable oil over medium high heat until the oil ripples and simmers in the pan and instantly erupts into lots of bubbles when you dip a corner of the chicken breast into it.",
        "Immediately reduce the heat to medium low and fry the chicken in batches until cooked through and golden on both sides, 4 to 6 minutes per side.",
        "If the oil seems to cool down to much during frying, increase the heat a little to maintain a steady bubbling action.",
        "Drain the chicken on paper towels and serve it with abundant shredded cabbage and tonkatsu sauce.",
        "tonkatsu sauce: In a small saucepan, whisk together the Worcestershire, sugar, soy sauce and ketchup.",
        "Bring to a simmer over medium low heat. Reduce the heat to gentle simmer and whisk often until reduced to 1 cup, about 10 minutes.",
        "Whisk in mustard and allspice.",
        "Cool to room temperature.",
        "The sauce will keep for 1 week in the refrigerator."
    ]

};

let sarahRecipe2 = {
    "name": "Old-Fashioned Oatmeal Cookies",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Enjoy the cookie",
    "datePosted": 1638172867145,
    "servingSize": 8,
    "image": "http://s3.amazonaws.com/gmi-digital-library/65caecf7-a8f7-4a09-8513-2659cf92871e.jpg",
    "tags": ["Breakfast", "Easy"],
    "cookTime": "40mins",
    "difficulty": "2 star",

    "ingredients": [
        {
            "raisins": 1
        },
        {
            "cup water": 1
        },
        {
            "shortening": 1
        },
        {
            "sugar": 1.5
        },
        {
            "flour": 2.5
        },
        {
            "soda": 1
        },
        {
            "salt": 1
        },
        {
            "cinnamon": 1
        },
        {
            "baking powder": 1
        },
        {
            "cloves": 1
        },
        {
            "oats": 2
        },
        {
            "chopped nuts": 1
        }
    ],
    "steps": [
        "Simmer raisins and water over medium heat until raisins are plump, about 15 minutes.",
        "Drain raisins, reserving the liquid.",
        "Add enough water to reserved liquid to measure 1/2 cup.",
        "Heat oven to 400°.",
        "Mix thoroughly shortening, sugar, eggs and vanilla.",
        "Stir in reserved liquid.",
        "Blend in remaining ingredients.",
        "Drop dough by rounded teaspoonfuls about 2 inches apart onto ungreased baking sheet.",
        "Bake 8 to 10 minutes or until light brown.",
        "About 6 1/2 dozen cookies."
    ]

};

let sarahRecipe3 = {
    "name": "Big Night Pizza",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Enjoy the pizza",
    "datePosted": 1638172867145,
    "servingSize": 10,
    "image": "http://upload.wikimedia.org/wikipedia/commons/c/c7/Spinach_pizza.jpg",
    "tags": ["dinner", "Easy"],
    "cookTime": "1 hr 30mins",
    "difficulty": "2 star",

    "ingredients": [
        {
            "yeast": 5

        },
        {
            "flour": 5

        },
        {
            "vegetable oil": 4

        },
        {
            "sugar": 2

        },
        {
            "salt": 2

        },
        {
            "hot water": 2

        },
        {
            "pizza sauce": 1

        },
        {
            "mozzarella cheese": 1

        }
    ],
    "steps": [
        "Add hot water to yeast in a large bowl and let sit for 15 minutes.",
        "Mix in oil, sugar, salt, and flour and let sit for 1 hour.",
        "Knead the dough and spread onto a pan.",
        "Spread pizza sauce and sprinkle cheese.",
        "Add any optional toppings as you wish.",
        "Bake at 400 deg Fahrenheit for 15 minutes.",
        "Enjoy!"
    ]

};

let sarahRecipe4 = {
    "name": "Cranberry and Apple Stuffed Acorn Squash",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Enjoy the dessert",
    "datePosted": 1638172867145,
    "servingSize": 6,
    "image": "http://elanaspantry.com/wp-content/uploads/2008/10/acorn_squash_with_cranberry.jpg",
    "tags": ["dinner", "Easy"],
    "cookTime": "1 hr",
    "difficulty": "2 star",

    "ingredients": [
        {
            "acorn squash": 2
        },
        {
            "boiling water": 1
        },
        {
            "apples chopped into 1.4 inch pieces": 2
        },
        {
            "dried cranberries": 1
        },
        {
            "cinnamon": 1
        },
        {
            "melted butter": 2
        }
    ],
    "steps": [
        "Cut squash in half, remove seeds.",
        "Place squash in baking dish, cut-side down.",
        "Pour 1/4-inch water into dish.",
        "Bake for 30 minutes at 350 degrees F.",
        "In large bowl, combine remaining ingredients.",
        "Remove squash from oven, fill with mix.",
        "Bake for 30-40 more minutes, until squash tender.",
        "Enjoy!"
    ]

};

let sarahRecipe5 = {
    "name": "Mic's Yorkshire Puds",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Enjoy the Curried Lentils and Rice",
    "datePosted": 1638172867145,
    "servingSize": 4,
    "image": "http://upload.wikimedia.org/wikipedia/commons/f/f9/Yorkshire_Pudding.jpg",
    "tags": ["dinner", "Easy"],
    "cookTime": "40mins",
    "difficulty": "2 star",

    "ingredients": [
        {
            "plain flour": 2
        },
        {
            "eggs": 3
        },
        {
            "milk": 3
        },
        {
            "vegetable oil": 3
        }
    ],
    "steps": [
        "Put the flour and some seasoning into a large bowl.",
        "Stir in eggs, one at a time.",
        "Whisk in milk until you have a smooth batter.",
        "Chill in the fridge for at least 30 minutes.",
        "Heat oven to 220C/gas mark 7.",
        "Pour the oil into the holes of a 8-hole muffin tin.",
        "Heat tin in the oven for 5 minutes.",
        "Ladle the batter mix into the tin.",
        "Bake for 30 minutes until well browned and risen."
    ]

};

let sarahRecipe6 = {
    "name": "Blueberry Oatmeal Squares",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Enjoy the breakfast",
    "datePosted": 1638172867145,
    "servingSize": 2,
    "image": "http://www.canadianliving.com/img/photos/biz/blueberry-oatmeal-squares5801359401371.jpg", "tags": ["Breakfast", "Easy"],
    "cookTime": "60mins",
    "difficulty": "2 star",

    "ingredients": [
        {
            "rolled oats, (not instant)": 2.5
        },
        {
            "all-purpose flour": 1
        },
        {
            "grated orange rind": 1
        },
        {
            "salt": 1
        },
        {

            "cold butter, cubed": 1
        },
        {
            "packed brown sugar": 0.5
        },
        {
            "fresh blueberries": 3
        },
        {
            "granulated sugar": 0.5
        },
        {
            "orange juice": 1
        },
        {
            "cornstarch": 4
        }
    ],
    "steps": [
        "Filling: In saucepan, bring blueberries, sugar and orange juice to boil; reduce heat and simmer until tender, about 10 minutes.",
        "Whisk cornstarch with 2 tbsp (25 mL) water; whisk into blueberries and boil, stirring, until thickened, about 1 minute.",
        "Place plastic wrap directly on surface; refrigerate until cooled, about 1 hour.",
        "In large bowl, whisk together oats, flour, sugar, orange rind and salt ; with pastry blender, cut in butter until in coarse crumbs.",
        "Press half into 8-inch (2 L) square parchment paper–lined metal cake pan; spread with blueberry filling.",
        "Bake in centre of 350°F oven until light golden, about 45 minutes.",
        "Let cool on rack before cutting into squares.",
        "(Make-ahead: Cover and refrigerate for up to 2 days or overwrap with heavy-duty foil and freeze for up to 2 weeks.)"
    ]

};

let sarahRecipe7 = {
    "name": "Crock Pot Roast",
    "author": "MMAfv3oCQDiL4u10",
    "description": "TO DIE FOR CROCK POT ROAST",
    "datePosted": 1638172867145,
    "servingSize": 8,
    "image": "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/27/20/8/picVfzLZo.jpg",
    "tags": ["Lunch", "Intermediate"],
    "cookTime": "9hrs 5mins",
    "difficulty": "4 star",

    "ingredients": [
        {
            "beef roast": 1
        },
        {
            "brown gravy mix": 1
        },
        {
            "dried Italian salad dressing mix": 1
        },
        {
            "dry ranch dressing mix": 1
        },
        {
            "water": 1
        }
    ],
    "steps": [
        "Place beef roast in crock pot.",
        "Mix the dried mixes together in a bowl and sprinkle over the roast.",
        "Pour the water around the roast.",
        "Cook on low for 7-9 hours.",
        "Optional tweaks:",
        "1. Use onion soup mix instead of ranch.",
        "2. Add one cup of red wine along with the water.",
        "3. Add potatoes, carrots, mushrooms, celery and onion 2-3 hours before end."
    ]

};

let sarahRecipe8 = {
    "name": "Easy Fired Rice",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Even kids will love this quick and easy fried rice, perfect for a weeknight meal.",
    "datePosted": 1638172867145,
    "servingSize": 4,
    "image": "https://img.taste.com.au/lM3V_jdk/w720-h480-cfill-q80/taste/2016/11/easy-fried-rice-118371-2.jpg",
    "tags": ["Lunch", "Easy"],
    "cookTime": "30mins",
    "difficulty": "1 star",

    "ingredients": [
        {
            "white long-grain rice": 1
        },
        {
            "vegetable oil": 2
        },
        {
            "eggs, lightly whisked": 2
        },
        {
            "bacon rashers, chopped": 2
        },
        {
            "carrot, peeled and grated": 1
        },
        {
            "soy sauce": 1
        }
    ],
    "steps": [
        "Cook the rice in a large saucepan of boiling water for 12 minutes or until tender. Drain and leave to cool.",
        "Heat oil in non-stick wok or large frying pan over medium heat. Add eggs. Swirl over base to form an omelette. Cook for 2 minutes or until set. Transfer to a chopping board. Set aside to cool slightly. Cut into short strips.",
        "Add bacon to wok. Cook 4 minutes until light golden. Add carrot. Stir fry 1 minute. Add shallots, peas and rice. Cook, stirring, 3-4 minutes. Add egg and soy sauce. Stir until heated through. Sprinkle with sesame seeds and top with extra shallots. Serve immediately."
    ]

};

let sarahRecipe9 = {
    "name": "Impossible quiche",
    "author": "MMAfv3oCQDiL4u10",
    "description": "A beautiful golden brown ham and cheese quiche that will delight the whole family.",
    "datePosted": 1638172867145,
    "servingSize": 6,
    "image": "https://img.taste.com.au/NPadfZm_/w720-h480-cfill-q80/taste/2016/11/impossible-quiche-24036-1.jpeg",
    "tags": ["Dinner", "Intermediate"],
    "cookTime": "40mins",
    "difficulty": "3 star",

    "ingredients": [
        {
            "ham, chopped": 125
        },
        {
            "small onion, finely chopped": 1
        },
        {
            "grated Devondale Tasty Cheese Block": 2.5
        },
        {
            "self-raising flour": 1
        },
        {
            "Salt & freshly ground pepper, to season": 2
        },
        {
            "eggs": 4
        },
        {
            "milk": 2
        }
    ],
    "steps": [
        "Preheat oven to 200°C. Grease a 5 cup capacity pie dish.",
        "Combine ham, onion, cheese, flour, salt and pepper in a medium bowl. Scatter over base of dish.",
        "Whisk eggs and milk together in a large jug and pour over ham mixture. Cook for about 40 minutes or until puffed and golden. Cool slightly. Serve warm or cold."
    ]

};

let sarahRecipe10 = {
    "name": "Blueberry Oatmeal Squares",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Enjoy the breakfast",
    "datePosted": 1638172867145,
    "servingSize": 2,
    "image": "https://www.averiecooks.com/wp-content/uploads/2015/02/blueberrycrumblebarstext.jpg",
    "tags": ["Breakfast", "Easy"],
    "cookTime": "60mins",
    "difficulty": "2 star",

    "ingredients": [
        {
            "rolled oats, (not instant)": 2.5
        },
        {
            "all-purpose flour": 1
        },
        {
            "grated orange rind": 1
        },
        {
            "salt": 1
        },
        {
            "cold butter, cubed": 1
        },
        {
            "packed brown sugar": 0.5
        },
        {
            "fresh blueberries": 3
        },
        {
            "granulated sugar": 0.5
        },
        {
            "orange juice": 1
        },
        {
            "cornstarch": 4
        }
    ],
    "steps": [
        "Filling: In saucepan, bring blueberries, sugar and orange juice to boil; reduce heat and simmer until tender, about 10 minutes.",
        "Whisk cornstarch with 2 tbsp (25 mL) water; whisk into blueberries and boil, stirring, until thickened, about 1 minute.",
        "Place plastic wrap directly on surface; refrigerate until cooled, about 1 hour.",
        "In large bowl, whisk together oats, flour, sugar, orange rind and salt ; with pastry blender, cut in butter until in coarse crumbs.",
        "Press half into 8-inch (2 L) square parchment paper–lined metal cake pan; spread with blueberry filling.",
        "Bake in centre of 350°F oven until light golden, about 45 minutes.",
        "Let cool on rack before cutting into squares.",
        "(Make-ahead: Cover and refrigerate for up to 2 days or overwrap with heavy-duty foil and freeze for up to 2 weeks.)"
    ]

};

let sarahRecipe11 = {
    "name": "Slow Cooker Root Beer BBQ Chicken",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Slow Cooker Root Beer BBQ Chicken is an easy weeknight meal or party food made with root beer, barbecue sauce and chicken.",
    "datePosted": 1638172867145,
    "servingSize": 8,
    "image": "https://dinnerthendessert.com/wp-content/uploads/2019/10/Slow-Cooker-Root-Beer-Chicken-16x9-320x320.jpg",
    "tags": ["Dinner", "Easy"],
    "cookTime": "4 hrs",
    "difficulty": "2 star",

    "ingredients": [
        {
            "boneless skinless chicken breasts": 2
        },
        {
            "root beer": 1
        },
        {
            "barbecue sauce": 1
        },
        {
            "kosher salt": 1
        },
        {
            "coarse ground black pepper": 0.5
        },
        {
            "amburger buns": 8
        }
    ],
    "steps": [
        "Place chicken in slow cooker.",
        "Whisk root beer, barbecue sauce, salt and pepper together in a bowl.",
        "Pour over the chicken.",
        "Cook, covered, on low heat for 4-5 hours or until chicken is tender.",
        "Remove chicken; cool slightly.",
        "Shred chicken with 2 forks and return to slow cooker.",
        "Serve on buns."
    ]

};
let sarahRecipe12 = {
    "name": "Easy Meatloaf",
    "author": "MMAfv3oCQDiL4u10",
    "description": "This is a very easy and no fail recipe for meatloaf. It won't take long to make at all, and it's quite good!",
    "datePosted": 1638172867145,
    "servingSize": 8,
    "image": "https://www.spendwithpennies.com/wp-content/uploads/2019/05/New-The-BEST-Meatloaf-7.jpg",
    "cookTime": "1 hrs 30 mins",
    "difficulty": "2 star",

    "ingredients": [
        {
            "pounds ground beef": 2
        },
        {
            "egg": 1
        },
        {
            "onion,chopped": 1
        },
        {
            "milk": 1
        },
        {
            "brown sugar": 2
        },
        {
            "prepared mustard": 2
        },
        {
            "ketchup": 0.5
        }
    ],
    "steps": [
        "Preheat oven to 350 degrees F (175 degrees C).",
        "In a large bowl, combine the beef, egg, onion, milk and bread OR cracker crumbs. Season with salt and pepper to taste and place in a lightly greased 9x5-inch loaf pan, or form into a loaf and place in a lightly greased 9x13-inch baking dish.",
        "In a separate small bowl, combine the brown sugar, mustard and ketchup. Mix well and pour over the meatloaf.",
        "Bake at 350 degrees F (175 degrees C) for 1 hour."
    ]

};

createRecipe(sarahRecipe1, recipeDB);
createRecipe(sarahRecipe2, recipeDB);
createRecipe(sarahRecipe3, recipeDB);
createRecipe(sarahRecipe4, recipeDB);
createRecipe(sarahRecipe5, recipeDB);
createRecipe(sarahRecipe6, recipeDB);
createRecipe(sarahRecipe7, recipeDB);
createRecipe(sarahRecipe8, recipeDB);
createRecipe(sarahRecipe9, recipeDB);
createRecipe(sarahRecipe10, recipeDB);
createRecipe(sarahRecipe11, recipeDB);
createRecipe(sarahRecipe12, recipeDB);

// let recipes = [
//     {
//         name: "Pumpkin Pie",
//         author: "MMAfv3oCQDiL4u10",
//         description: "The perfect ending to a Thanksgiving feast!",
//         datePosted: Date(),
//         servingSize: 8,
//         image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/3/6/0/RF0104_From-Scratch-Pumpkin-Pie_s4x3.jpg.rend.hgtvcom.616.462.suffix/1433678596474.jpeg",
//         tags: ["Dessert", "Seasonal"],
//         cookTime: "55 mins",
//         difficulty: "2 star",
//         ingredients: [
//             "1 (15 ounce) can pumpkin",
//             "1 (14 ounce) can sweetened ondensed milk",
//             "2 large eggs",
//             "1 teaspoon ground cinnamon",
//             "1/2 teaspoon ground ginger",
//             "1/2 teaspoon ground nutmeg",
//             "1/2 teaspoon salt",
//             "1 (9 inch) unbaked pie crust",
//         ],
//         steps: [
//             "Preheat oven to 425 degrees F. Whisk pumpkin, sweetened condensed milk, eggs, spices and salt in medium bowl until smooth. Pour into crust. Bake 15 minutes.",
//             "Reduce oven temperature to 350 degrees F and continue baking 35 to 40 minutes or until knife inserted 1 inch from crust comes out clean. Cool. Garnish as desired. Store leftovers covered in refrigerator.",
//         ],
//     },
//     {
//         name: "Chicken Stir Fry",
//         author: "MMAfv3oCQDiL4u10",
//         description:
//             "This chicken and vegetable stir fry will become your easy go-to dinner. You will wow your guests and family alike, even the picky eaters with approve!",
//         datePosted: Date(),
//         servingSize: 4,
//         image: "https://www.chelseasmessyapron.com/wp-content/uploads/2019/06/Chicken-Stir-Fry-5.jpg",
//         tags: ["Asian", "Main course"],
//         cookTime: "15 mins",
//         difficulty: "2 star",
//         ingredients: [
//             "1 lb chicken thighs, cut into bite-sized pieces",
//             "1/2 zucchini, sliced or cubed",
//             "2 Tbsp oil, divided",
//             "1 Tbsp butter",
//             "1 cup broccoli, cut into florets",
//             "1 small carrot, julienned or cubed",
//             "8 oz mushrooms, sliced",
//             "1/2 red pepper, cubed",
//             "4 garlic cloves, minced",
//             "1 tsp fresh ginger, minced",
//             "1/2 onion, cubed",
//             "½ cup cashews",
//             "1/2 cup chicken broth",
//             "1/4 cup water",
//             "1/4 cup soy sauce",
//             "2 Tbsp honey",
//             "1 Tbsp cornstarch",
//         ],
//         steps: [
//             "Trim chicken thighs of excess fat and cut into bite-sized pieces. Cut the vegetables into even-sized pieces (about the same size as the chicken pieces).",
//             "For the sauce, combine chicken broth, water, soy sauce, honey, and cornstarch in a bowl.",
//             "In a large pan (or wok), on med/high heat, heat 1 Tbsp oil. Once oil is hot, add chicken in a single layer. Cook chicken until browned, mixing as needed. Once cooked, remove chicken from pan and set aside.",
//             "Add the remaining oil and the butter to skillet with the broccoli, zucchini, mushrooms, red peppers, onion, and carrots. Cook until vegetables are crisp tender, mixing frequently.",
//             "Add chicken back to the pan. Add the garlic and ginger and cook 1 minute, stirring frequently.",
//             "Add the cashews then pour the sauce into the pan and bring to a boil. Turn down heat and let stir fry simmer until the sauce thickens and is well incorporated with the remaining ingredients. Garnish with green onion and sesame seed before serving if desired.",
//         ],
//     },
//     {
//         name: "Chicken Fajitas",
//         author: "MMAfv3oCQDiL4u10",
//         description:
//             "Chicken fajitas are an easy and flavorful weeknight meal.",
//         datePosted: Date(),
//         servingSize: 6,
//         image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/02/Chicken-Fajitas-7.jpg",
//         tags: ["Mexican", "Main course"],
//         cookTime: "60 mins",
//         difficulty: "2 star",
//         ingredients: [
//             "1/2 c. plus 1 tbsp. extra-virgin olive oil",
//             "1/4 c. lime juice, from about 3 limes",
//             "2 tsp. cumin",
//             "1/2 tsp. crushed red pepper flakes",
//             "1 lb. boneless skinless chicken breasts",
//             "Kosher salt",
//             "Freshly ground black pepper",
//             "2 bell peppers, thinly sliced",
//             "1 large onion, thinly sliced",
//             "Tortillas, for serving",
//         ],
//         steps: [
//             "In a large bowl, whisk together 1⁄2 cup oil, lime juice, cumin, and red pepper flakes. Season chicken with salt and pepper, then add to bowl and toss to coat. Let marinate in the fridge at least 30 minutes and up to 2 hours.",
//             "When ready to cook, heat remaining tablespoon oil in a large skillet over medium heat. Add chicken and cook until golden and cooked through, 8 minutes per side. Let rest 10 minutes, then slice into strips.",
//             "Add bell peppers and onion to skillet and cook until soft, 5 minutes. Add chicken and toss until combined. Serve with tortillas.",
//         ],
//     },
// ];

// await createRecipe(recipes[2], recipeDB);

// for (let recipe in recipes) {
//     await createRecipe(recipe, recipeDB);
// }
