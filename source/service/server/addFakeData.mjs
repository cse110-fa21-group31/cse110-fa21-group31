import { USER_DB_PATH, RECIPE_DB_PATH } from "../util.js";
import Datastore from "nedb";

const userDB = new Datastore({ filename: USER_DB_PATH, autoload: true });
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });

let sarahRecipe74 = {
    "name": "Shaved Brussels Sprout Salad with Creamy Maple Dressing",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Shaved Brussels sprouts make an elegant, refreshing fall salad when dressed with a simple, creamy maple vinaigrette dressing and tossed with crisp apple slices.",
    "datePosted": 1638172867145,
    "servingSize": 10,
    "image": "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Shaved-Brussels-Sprout-Salad-6.jpg?w=1200&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599769365&s=8884b1f3c689c4741a1bf947e5c88211",
    "tags": ["Lunch", "Dinner", "Easy", "Vegetarian","Intermediate"],
    "cookTime": "25 mins",
    "difficulty": "2 star",

    "ingredients": {
        "Large brussels sprouts":"20-25",
        "Pepitas (pumpkin seeds)":"1/2 cup",
        "Pecan halves, toasted (this helps keep them crunchy)":"1 1/2 cups",
        "Honeycrisp apple, sliced":"1 large",
        "Dried cherries":"1 1/2 cups",
        "Pomegranate, seeded":"1"
    },
    "steps": [
        "Using a mandoline, shave brussels sprouts and place them in the bowl.",
        "Toss the shaved sprouts with the maple dressing and fold in the pumpkin seeds, pecans, apple slices, cherries and pomegranate seeds."
    ]
    
};
let sarahRecipe75 = {
    "name": "Vegan Roasted Sweet Potato Salad",
    "author": "MMAfv3oCQDiL4u10",
    "description": "A hearty mountain of roasted sweet potatoes, avocado, black beans and raw kale are tossed in a creamy lime-cashew-cilantro dressing in this brightly flavorful, vegan sweet potato salad recipe.",
    "datePosted": 1638172867145,
    "servingSize": 6,
    "image": "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Vegan-Roasted-Sweet-Potato-Salad-5.jpg?w=1200&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599768722&s=15424cd57c44d2f2768653a2326996ce",
    "tags": ["Breakfast", "Lunch", "Dinner", "Easy", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "30 mins",
    "difficulty": "3 star",

    "ingredients": {
        "Sweet potatoes (about 2 lbs)":"3",
        "Olive oil":"2 tbsp",
        "Taco seasoning":"2 tbsp",
        "Bunches kale, stems removed, torn into 2 inch pieces (6 cups)":"2",
        "Cilantro leaves":"1/2 cup",
        "Green onions, thinly sliced":"3",
        "Can black beans, drained and rinsed":"1",
        "Avocado, large sliced":"1",
        "Cilantro":"1/2 cup",
        "Garlic cloves":"3",
        "Lime juice":"3 tbsp",
        "Sea salt":"1/2 tsp",
        "Olive oil":"3 tbsp",
        "Cashews":"1/2 cup",
        "Water":"3/4 cup",
        "Jalapeno, seeded":"1/2",
        "Avocado":"1/2"
    },
    "steps": [
        "Preheat oven at 400°F.",
        "Cut sweet potatoes into 2” cubes. In a large bowl, toss the sweet potatoes with olive oil and taco seasoning. Arrange on a baking sheet, careful not to overcrowd. Roast on the center rack in oven for 30 minutes, flipping the sweet potatoes half way through. (If sweet potatoes aren't tender enough, cook for an additional 5 minutes.)",
        "In a high-powered blender, blend all ingredients for the dressing. You should end up with about 1 ¼ cups of the vegan cilantro-lime dressing.",
      
        "In a large bowl, toss the kale, cilantro, green onions, black beans, roasted sweet potatoes, avocado, with desired amount of dressing. Enjoy!"
    ]
    
};
let sarahRecipe76 = {
    "name": "Honey Roasted Sweet Potatoes with Labneh",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Honey-roasted sweet potatoes with cinnamon and ginger pair perfectly with our favorite lemon zest labneh recipe, finished with a generous drizzle of good olive oil and flaky sea salt!",
    "datePosted": 1638172867145,
    "servingSize": 6,
    "image": "https://images.themodernproper.com/billowy-turkey/production/posts/2019/honey-roasted-sweet-potatoes-with-labneh-13.jpg?w=1200&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599767458&s=1cfe4e21d220ac035071029e7467c123",
    "tags": ["Lunch", "Dinner", "Easy", "Vegetarian","Intermediate"],
    "cookTime": "40 mins",
    "difficulty": "2 star",

    "ingredients": {
        "Plain greek yogurt":"16 oz",
        "Lemon, zested":"1",
        "Salt, divided":"2 tsp",
        "Sweet potatoes, peeled cut into 1 1/2 pieces":"3 lbs",
        "Honey, warmed":"3 tbsp",
        "Olive oil":"⅓ cup",
        "Cinnamon":"1 tsp",
        "Ground ginger":"1 tsp",
        "Crushed red pepper flakes":"½ tsp"
    },
    "steps": [
        "In a small bowl, mix the yogurt, 1 teaspoon salt and lemon zest.",
        "Line a large sieve or colander with cheesecloth or clean, thin (flour sack style) dish cloth; set over a large bowl. Place the yogurt mixture in the colander. Gather edges of cheesecloth to cover yogurt. Place in refrigerator and let drain for 4-6 hours (longer if you want it to be thicker).",
        "Gently squeeze out any excess liquid over the sink, set aside.",
        "Heat oven to 375 degrees F.",
        "In a small bowl mix the honey, olive oil, cinnamon, ginger, salt and crushed red pepper flakes.",
        "Lay the sweet potatoes out on a rimmed baking dish in a single layer. Drizzle the honey mixture over the potatoes. Roast, tossing occasionally, for 35-40 minutes in oven or until tender.Drizzle with more extra-virgin olive oil.",
        "Spread the labneh onto a platter and top with the roasted sweet potatoes. Drizzle with extra olive oil and sprinkle with parsley, green onions and flakey sea salt to taste."
    ]
    
};
let sarahRecipe77 = {
    "name": "Roasted Acorn Squash",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Brushed with a sweet-and-smoky spiced butter, this roasted acorn squash recipe is simple, cozy winter fare at its finest.",
    "datePosted": 1638172867145,
    "servingSize": 8,
    "image": "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Roasted-Acorn-Squash-11.jpg?w=1200&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599769668&s=7c110903693ed33bd64f91e7dfc57b70",
    "tags": ["Lunch", "Dinner", "Easy", "Vegetarian","Intermediate"],
    "cookTime": "50 mins",
    "difficulty": "2 star",

    "ingredients": {
        "Small acorn squash (smaller than the size of your hand), membranes and seeds removed and quartered":"4",
        "Butter, melted":"1/2 cup",
        "Chili powder":"1 tbsp",
        "Cumin":"2 tsp",
        "Salt":"1 tsp",
        "Brown sugar":"2 tbsp"
    },
    "steps": [
        "Preheat oven to 400°F.",
        "In a small bowl combine melted butter, brown sugar and spices. Brush squash halves with butter mixture, reserving the remaining butter mixture in a bowl. Place squash, cut sides down, on a parchment paper–lined baking sheet.",
        "Bake on center rack until the cut sides of the squash turn golden brown, 20 minutes. Flip squash onto its other flesh side and continue cooking for 15 minutes. Remove from oven and flip squash skin side and spoon reserved butter mixture over it. Return squash to oven, and continue baking until browned and caramelized, 15 minutes."
    ]
    
};
let sarahRecipe78 = {
    "name": "Sweet Potato Carnitas Hash",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Sweet potatoes and slow-cooker carnitas join forces for a hearty and flavor-packed hash that’s tailor made to save you from your breakfast rut.",
    "datePosted": 1638172867145,
    "servingSize": 8,
    "image": "https://images.themodernproper.com/billowy-turkey/production/posts/2019/sweet-potato-carnitas-hash-7.jpg?w=1200&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1608133741&s=9e279ca6bb3834dc0eef74659d2132f7",
    "tags": ["Lunch", "Breakfast", "Easy", "Vegetarian","Intermediate"],
    "cookTime": "30 mins",
    "difficulty": "2 star",

    "ingredients": {
        "Olive oil":"2 tbsp",
        "Medium sweet potatoes, peeled and cut into 1 inch cubes":"2",
        "Red bell pepper, thinly sliced":"1",
        "Green bell pepper, thinly sliced":"1",
        "Small yellow onion, thinly sliced":"1/2",
        "Kosher salt":"1/2 tsp",
        "Carnitas":"1-2 cups",
        "Eggs, fried":"2"
        
    },
    "steps": [
        "Heat the olive oil in a 10-inch skillet set over medium-high heat. Fry the sweet potatoes for about 5 minutes, turning occasionally when starting to brown. If they sweet potatoes brown too quickly, reduce the heat slightly. Add peppers and onions and continue to cook until all the vegetables are tender, about 10 minutes. Add the carnitas and cook until warmed through. Season with salt.",
        "Top with fried eggs, avocado and cilantro."
    ]
    
};
let sarahRecipe79 = {
    "name": "Vegetable Soup",
    "author": "MMAfv3oCQDiL4u10",
    "description": "A classic vegetable soup recipe, to carry you through fall and keep you cozy, healthy and warm well into the chill of winter.",
    "datePosted": 1638172867145,
    "servingSize": 6,
    "image": "https://images.themodernproper.com/billowy-turkey/production/posts/2020/Vegetable-Soup-8.jpg?w=667&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1600877034&s=3cd2c2ede393325fb4b39768142d6dc3",
    "tags": ["Lunch", "Dinner", "Easy", "Vegetarian","Intermediate"],
    "cookTime": "15 mins",
    "difficulty": "2 star",

    "ingredients": {
        "Olive oil":"2 tbsp",
        "Onion, chopped (about 2 cups)":"1",
        "Celery ribs, chopped (about 2 cups)":"4",
        "Garlic cloves, minced":"3",
        "Diced zucchini":"2 cups",
        "Green beans, fresh and frozen cut into 1 inch pieces":"1 cup",
        "Salt":"1 tsp",
        "Thyme":"1 tsp",
        "Chili powder or 1 tsp paprika or smoked paprika":"2 tsp",
        "Fresh basil or 2 tsp dried":"1/4 cup",
        "Brown sugar, optional":"1 tbsp",
        "Vegetable or chicken stock":"4 cups",
        "Water":"2 cups",
        "28 oz can whole tomatoes, undrained and crushed with hands":"1",
        "14 oz can tomato sauce":"1"
    },
    "steps": [
        "Heat the oil in a large soup pot, set over medium-high heat.",
        "Sauté onions and celery for 5 minutes until the onions are translucent.",
        "Add garlic, zucchini and green beans; sauté for 2 minutes.",
        "Stir in remaining ingredients, making sure you crush the tomatoes with your hands and pour in all the juices left in the can; Bring the soup to a boil.",
        "Reduce the heat and simmer covered for 30 minutes until the zucchini and green beans are tender.",
        "Serve with extra basil and parmesan if desired."
    ]
    
};
let sarahRecipe80 = {
    "name": "Walnut and Lentil Bolognese",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Boldly flavored, super hearty and incredibly easy, this vegan walnut and lentil bolognese recipe takes your plant-based eating goals to new heights.",
    "datePosted": 1638172867145,
    "servingSize": 8,
    "image": "https://images.themodernproper.com/billowy-turkey/production/posts/2020/Vegan-Walnut-and-Lentil-Bolognese-8.jpg?w=667&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1610373930&s=1a449746a00243d582e66ef96c375115",
    "tags": ["Lunch", "Dinner", "Hard", "Vegetarian","Intermediate"],
    "cookTime": "55 mins",
    "difficulty": "2 star",

    "ingredients": {
        "Olive oil":"2 tbsp",
        "Grated carrots":"1 cup",
        "Celery, minced":"1 cup",
        "Onions, finely minced":"1 cup",
        "Walnuts, finely chopped":"1 cup",
        "Dried lentils (brown or green), rinsed in a fine mesh sieve":"1 cup",
        "Marinara":"1 (24) oz jar",
        "Water":"6 cups",
        "Salt":"1 tsp",
        "Wide pasta noodles, such as pappardelle or tagliatelle":"1 lb"
       
    },
    "steps": [
        "In a large saucepan or braiser heat olive oil over medium heat. Add the carrots, celery and onions and sauté until tender, about 6 minutes.",
        "Add the walnuts and lentils along with the salt, water and jar of marinara. Stir to combine.",
        "Simmer on medium-low for 45 minutes stirring occasionally, until sauce thickens.",
        "When the lentils have reached your desired tenderness, transfer 2 cups of the sauce to a blender or food processor. Blend until nearly smooth. Add the blended sauce back to the pan and stir to combine. Blending is an optional step, but it helps add a creaminess without the need to add cream.",
        "Remove from heat, and serve over your favorite pasta—such as pappardelle or tagliatelle—and top with freshly grated or vegan parmesan cheese."
    ]
    
};
let sarahRecipe81 = {
    "name": "Vegetarian Burrito Bowl with Avocado Crema",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Roasted veggies, savory beans and a lime-garlic avocado crema top a bed of cilantro-lime rice in this hearty, healthy vegetarian burrito bowl recipe",
    "datePosted": 1638172867145,
    "servingSize": 6,
    "image": "https://images.themodernproper.com/billowy-turkey/production/posts/2020/Vegetarian-Burrito-Bowl-13.jpg?w=667&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599768871&s=3c6b5cdfed282781c396e77cb32b0127",
    "tags": ["Lunch", "Dinner", "Easy", "Vegetarian","Intermediate"],
    "cookTime": "30 mins",
    "difficulty": "2 star",

    "ingredients": {
        "Head of cauliflower, cut into florets":"1",
        "Green bell pepper, ½” sliced":"1",
        "Red bell pepper ½” sliced":"1",
        "Onion ½” sliced":"½",
        "Olive oil":"⅓ cup",
        "Lime juice":"2 tbsp",
        "Taco seasoning, homemade or 1 packet of store bought":"¼ cup",
        "Pinto or black beans":"1 can",
        "Salsa":"½ cup",
        "Romaine lettuce, roughly chopped":"2 cups",
        "Cilantro-lime rice":"4 cups",
        "Avocado":"1",
        "Garlic clove, minced":"1",
        "Sour cream":"1/2 cup",
        "Salt":"1/2 tsp",
        "Lime juice":"3 tbsp",
        "Cilantro":"1/4 cup"    
    },
    "steps": [
        "Preheat the oven to 400°F.",
        "In a large bowl toss cauliflower, onion, and bell peppers with the taco seasoning, olive oil and lime juice then spread out on a large (rimmed) baking sheet.",
        "Place on the center rack and bake for 30 minutes or until the cauliflower is tender with crispy edges.",
        "While the vegetables are cooking prepare avocado crema by placing all ingredients in a food processor or small blender and blending until smooth.",
        "In a small skillet combine beans and salsa over medium heat and cook for 5 minutes, until warmed through.",
        "Serve the roasted taco vegetables over cilantro rice, with the beans, lettuce and avocado crema."
    ]
    
};
let sarahRecipe82 = {
    "name": "Creamy Vegan Pasta",
    "author": "MMAfv3oCQDiL4u10",
    "description": "This creamy vegan pasta is the perfect weeknight meal! Coated in a tangy, luscious white bean sauce, it's comforting, healthy, and easy to make.",
    "datePosted": 1638172867145,
    "servingSize": 8,
    "image": "https://cdn.loveandlemons.com/wp-content/uploads/2017/10/vegan-pasta.jpg",
    "tags": ["Lunch", "Dinner", "Easy", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "30 mins",
    "difficulty": "4 star",

    "ingredients": {
        "small shell pasta":"2½ cups",
        "extra-virgin olive oil":"1 tablespoon",
        "yellow onion, chopped":"1 ",
        "broccoli florets, chopped stems, and leaves (keep stems separate)":"5 cups",
        "toasted pine nuts":"¼ cup",
        "cooked white beans, drained and rinsed":"1½ cups",
        "vegetable broth, more as needed":"¼ cup",
        "fresh lemon juice":"3 tablespoons",
        "extra-virgin olive oil":"2 tablespoons",
        "nutritional yeast*":"¼ cup",
        "garlic clove, minced":"1",
        "onion powder":"¼ teaspoon",
        "sea salt":"½ teaspoon"
    },
    "steps": [
        "Make the sauce: In a blender, combine the white beans, broth, lemon juice, olive oil, nutritional yeast, garlic, onion powder, salt, and pepper, and blend until smooth. Set aside.",
        "Bring a large pot of salted water to a boil. Prepare the pasta according to the instructions on the package, cooking until al dente. Drain and set aside.",
        "Heat 1 tablespoon of olive oil in a large skillet over medium heat. Add the onion and sauté until soft, about 5 minutes.",
        "Stir in the chopped broccoli stems and cook for another 3 to 5 minutes or until tender. Add the broccoli florets and leaves and a splash of water or vegetable broth. Cover and turn off the heat.",
        "Allow the broccoli to steam for 2 to 3 minutes or until tender but still bright green. Add the pasta, then stir in ¾ of the sauce, adding more broth if the sauce is too dry.",
        "Season to taste with more salt, pepper and lemon juice, as desired, and portion into bowls. Divide the remaining sauce onto each bowl. Top with the pine nuts and serve with lemon wedges on the side."
    ]
    
};
let sarahRecipe83 = {
    "name": "Butternut Squash Stuffed Shells",
    "author": "MMAfv3oCQDiL4u10",
    "description": "This recipe is an all-time Love and Lemons fan favorite, and for good reason. Even the biggest cheese lovers will fall for its bright, creamy spinach “ricotta,” caramelized cubes of butternut squash, and rich cashew cream sauce.",
    "datePosted": 1638172867145,
    "servingSize": 4,
    "image": "https://cdn.loveandlemons.com/wp-content/uploads/2015/11/IMG_2015_11_14_06673-2.jpg",
    "tags": ["Lunch", "Dinner", "Hard", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "55 mins",
    "difficulty": "4 star",

    "ingredients": {
        "cubed butternut squash":"1½ cups",
        "jumbo shells":"16",
        "raw cashews*":"1½ cups",
        "fresh water":"1 cup",
        "garlic clove":"1",
        "fresh lemon juice":"3½ tablespoons",
        "sea salt":"1/2 teaspoon",
        "ground pepper":"some",
        "fresh baby spinach":"4 cups ",
        "crumbled firm tofu":"1 cup",
        "dried oregano":"1 teaspoon",
        "lemon zest":"1/2 teaspoon ",
        "cashew cream, from the recipe above":"1 cup"
    },
    "steps": [
        "Preheat the oven to 350°F and line a baking sheet with parchment paper. Toss the butternut squash with a drizzle of olive oil and a few generous pinches of salt and pepper. Roast until golden brown, 20 to 25 minutes.",
        "Make the cashew cream: Blend together the drained raw cashews, fresh water, garlic, lemon juice, 1/2 teaspoon salt and pepper.",
        "Make the filling: In a medium skillet, heat a drizzle of olive oil over medium heat. Add the spinach in increments, along with a pinch of salt, and sauté until all the spinach is incorporated and wilted. Remove from heat and let cool slightly. Squeeze out any excess liquid and chop. In a medium bowl, combine the the spinach with the crumbled tofu, oregano, lemon zest, red pepper flakes, at least 1/4 teaspoon salt, freshly ground black pepper and 1 cup of cashew cream. Season to taste, adding more salt and pepper as desired.",
        "Bring a large pot of salted water to a boil. Add the shells and cook according to the package directions until al dente. Drain.",
        "Assemble the shells. Spread ¼ cup of the reserved cashew cream on the bottom of an 11x7-inch baking dish. Fill each cooked shell with some of the filling and a few cubes of butternut squash, and place into the baking dish. Drizzle a little olive oil over the shells, cover with foil, and bake for 15 minutes, or until heated through. Remove from the oven and serve with the remaining cashew cream."
    ]
    
};
let sarahRecipe84 = {
    "name": "BEETROOT HUMMUS",
    "author": "MMAfv3oCQDiL4u10",
    "description": "You're going to be dipping everything into this creamy, beautiful and vibrant beetroot hummus!It looks stunning, it's cheap, healthy and it all comes together in a food processor in 5 minutes!",
    "datePosted": 1638172867145,
    "servingSize": 4,
    "image": "https://theclevermeal.com/wp-content/uploads/2019/10/IMG_5809.jpg",
    "tags": ["Appetizer", "Easy", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "5 mins",
    "difficulty": "1 star",

    "ingredients": {
        "15-ozcan chickpeas, drained":"1",
        "cooked or roasted beetroots, cubed and drained (basically 1/2 15-oz can)":"7 oz ",
        "tahini sauce*":"2 Tbsp",
        "lemon, zest and juice":"1",
        "olive oil*":"3 Tbsp",
        "garlic clove, pressed (or more if you like)":"1",
        "ground cumin":"1 tsp",
        "fine salt, or more to taste":"1 tsp",
        "black pepper, to taste":"some"
    },
    "steps": [
         "Place all the ingredients into a food processor.",
         "Blend until smooth. if it's too thick, you might gradually add some of the chickpea liquid or some water until the desired consistency is reached.",
         "Taste ad adjust the seasoning according to your own taste. You might need more salt, lemon juice or olive oil.",
         "Serve topped with crunchy walnuts, and crudites, crackers or pita bread on the side. Also it looks so pretty spread onto crostini, and the addition of the walnuts adds a good touch."
    ]
    
};
let sarahRecipe85 = {
    "name": "VEGAN TOMATO FLATBREAD",
    "author": "MMAfv3oCQDiL4u10",
    "description": "This tomato flatbread is one of my favorite quick dinners, because it’s super delicious and totally customizable with whatever you have on hands. My tomato flatbread is not only pretty, but also full of late summer-early autumn, tomato-y flavors! Of course, this flatbread is best when you have a lots of different tomatoes to use, but plain ol’ tomatoes will also do the job, if you don’t have access to such things. Just roll out your favorite pizza dough, top with tahini, garlic and tomatoes, and enjoy your amazing meal!",
    "datePosted": 1638172867145,
    "servingSize": 1,
    "image": "https://theclevermeal.com/wp-content/uploads/2019/01/roundup_vegan_app3__0000_Background.jpg",
    "tags": ["Appetizer","Lunch", "Easy", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "15 mins",
    "difficulty": "4 star",

    "ingredients": {
        "pizza dough of your choice *":"350 g/12 oz",
        "tahini":"2–3 tbsp",
        "garlic, minced":"3 cloves",
        "tomatoes and cherry tomatoes, sliced":"500 g/18 oz",
        "pine nuts":"2 tbsp",
        "fresh, chopped herbs":"2 tbsp",
        "slat, pepper":"some"
    },
    "steps": [
         "Preheat oven to 250°C/480ºF. Pat or roll pizza dough into desired shape, and transfer to a baking sheet.",
         "Spread tahini over pizza dough, sprinkle with minced garlic, salt and pepper. Arrange tomato slices in a single layer on pizza, and top with pine nuts.",
         
         "Bake for 15-20 minutes, or until pizza dough is golden brown. Serve warm with fresh herbs on top."
    ]
    
};
let sarahRecipe86 = {
    "name": "CHICKPEA BRUSCHETTA WITH SUN DRIED TOMATOES",
    "author": "MMAfv3oCQDiL4u10",
    "description": "This simple, bold and bursting with fresh flavor chickpea bruschetta will please everyone's tastes in no time. Plus, smashed chickpeas with sun-dried tomatoes make a scrumptious topping when fresh cherry tomatoes are still out of season and flavorless. This is the ultimate yummy appetizer for any casual spring menu!",
    "datePosted": 1638172867145,
    "servingSize": 10,
    "image": "https://theclevermeal.com/wp-content/uploads/2019/03/ceci_bruschetta2.jpg",
    "tags": ["Appetizer","Lunch","Dinner", "Easy", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "10 mins",
    "difficulty": "2 star",

    "ingredients": {
        "chickpeas, rinsed and drained":"1 can",
        "baguette or rustic bread":"1",
        "chopped parsley leaves, plus extra to serve":"2 Tbsp",
        "sun dried tomatoes, drained and chopped":"6",
        "extra virgin olive oil or olive oil, plus extra to serve":"1 Tbsp",
        "lemon juice":"1 Tbsp",
        "garlic cloves, peeled":"2",
        "fine salt, or according to taste":"1/4 tsp",
        "black pepper":"some"
       
    },
    "steps": [
         "Smash the chickpeas and add the parsley, extra virgin olive oil, sun dried tomatoes, lemon juice, salt and pepper. Mix well.",
         "Cut the baguette into diagonal slices (about 1/2 inch thick), arrange in a baking sheet and bake in a preheated oven at 400F until crisp and dry. Alternatively, toast the slices in a pan with a little of olive oil and cook for a few minutes until golden. I love this method, it adds more flavor.",
         "Rub the toasts with the garlic and top them with the chickpea mixture, sprinkle with extra parsley and drizzle olive oil. Serve immediately."
    ]
    
};
let sarahRecipe87 = {
    "name": "10-MINUTE VEGAN TZATZIKI",
    "author": "MMAfv3oCQDiL4u10",
    "description": "This creamy, garlicky and dairy-free vegan tzatziki sauce calls for simple and healthy ingredients. It's perfect for dipping or served with toasted pita bread, falafels, olives, crudites or grilled vegetables. You can eat tzatziki with almost anything!",
    "datePosted": 1638172867145,
    "servingSize": 2,
    "image": "https://theclevermeal.com/wp-content/uploads/2019/10/IMG_5902-180x180.jpg",
    "tags": ["Appetizer", "Easy", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "10 mins",
    "difficulty": "3 star",

    "ingredients": {
        "coconut yogurt":"1 cup",
        "grated cucumber, drained*":"1/4 cup",
        " large garlic clove, minced or pressed":"1",
        "fresh dill, chopped":"2 Tbsp",
        "olive oil":"1 Tbsp",
        "lemon juice":"1 Tbsp",
        "salt":"1/4 tsp",
        "ground black pepprr":"some"
    },
    "steps": [
         "Coarsely grate the cucumber with the skin on. Then set in a mesh strainer over a small bowl and squeeze out the excess water until mostly dry. Set aside",
         "Add coconut yogurt to a mixing bowl, then add grated cucumber, minced garlic, dill, salt, pepper, lemon juice, and olive oil. Stir well to combine.",
         "Taste and adjust the seasoning according to your taste. You might want to add more garlic or lemon or salt.",
         "Chill the tzatziki in the refrigerator for at least an hour before serving to allow flavors to mingle."
    ]
    
};
let sarahRecipe88 = {
    "name": "Vegan Nashville Hot Cauliflower Wings",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Vegan Nashville Hot Cauliflower Bites. These Nashville Style Hot Cauliflower wings are flavorful, hot and Delicious! Serve with vegan ranch or other dips. Add to wraps or bowls. Vegan Nutfree Soyfree Recipe. Glutenfree option",
    "datePosted": 1638172867145,
    "servingSize": 4,
    "image": "https://www.veganricha.com/wp-content/uploads/2019/02/Nashville-style-Cauliflower-Wings-veganricha-6845-180x180.jpg",
    "tags": ["Appetizer", "Hard", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "40 mins",
    "difficulty": "3 star",

    "ingredients": {
        "non dairy milk such as almond or soy milk":"1/3 cup (78.67 ml)",
        "hot sauce":"1 tsp",
        "garlic powder":"1/2 tsp (0.5 tsp)",
        "onion powder":"1/2 tsp (0.5 tsp)",
        "salt":"1/2 tsp (0.5 tsp)",
        "flour ":"1/4 cup (31.25 g)",
        "starch":"3 tbsp",
        "baking powder":"1/2 tsp (0.5 tsp)",
        "oil":"1 tsp",
        "oil or melted vegan butter":"1 tbsp",
        "cayenne ":"1/2 tsp (0.5 tsp)",
        "black pepper ":"1 tsp",
        "sugar":"1 tsp",
        "sweet paprika":"1 tsp",
        "poultry seasoning":"1/2 tsp (0.5 tsp)",
        "vinegar":"1 tbsp",
        "water":"1 tbsp"
    },
    "steps": [
         "Chop the cauliflower and set aside. Line a baking dish with parchment. Preheat the oven to 425 deg F ( 220 C).",
         "Make the batter by whisking all the ingredients under batter. The batter will start to thicken after half a minute, so work quickly.",
         "Add cauliflower florets and toss well to coat. It will take a minute for the thick batter to coat the florets well. Some uncoated cauliflower edges are ok. Drop on parchment lined baking dish. Spray oil on top. (You can also sprinkle 2-3 tbsp breadcrumbs on the florets in the dish for extra crispyness).",
         "Bake at 425 deg F for 25 mins (35 mins if serving the bites with hot sauce on the side) . In the meantime, make the nashville hot sauce mixture in large bowl. You can double this sauce easily for larger cauliflower. ",
         "Remove the dish from the oven and cool for 5 mins. Add the baked cauliflower to the sauce bowl and gently toss to coat.",
         "Drop back into the baking dish and bake for 15 mins or longer at 400 deg F.  Serve with cooling dips such as vegan ranch and some pickles."
    ]
    
};
let sarahRecipe89 = {
    "name": "SMOKY BEANS ON TOAST, THE PERFECT BRUSCHETTA!",
    "author": "MMAfv3oCQDiL4u10",
    "description": "Smoky beans on garlic toast make a delicious bruschetta! They're are super easy to make, healthy, inexpensive, and packed with big flavors. Guaranteed to please a crowd!",
    "datePosted": 1638172867145,
    "servingSize": 10,
    "image": "https://theclevermeal.com/wp-content/uploads/2020/02/IMG_9995-copy-180x180.jpg",
    "tags": ["Appetizer", "Easy", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "15 mins",
    "difficulty": "2 star",

    "ingredients": {
        "baguette or rustic bread, toasted":"10 slices",
        "cannellini beans, drained":"1 can",
        "extra virgin olive oil, plus extra for drizzling":"2 Tbsp",
        "onion, chopped":"2 Tbsp",
        "smoked paprika":"1/2 tsp ",
        "chili flakes":"1/4 tsp ",
        "salt":"1/4 tsp ",
        "fresh thyme, leaves":"1 tsp",
        "garlic, cloves":"2"
    },
    "steps": [
         "Heat 1 Tbsp of olive oil in a pan over medium heat. Cook the chopped onion for about 3 minutes, until soft. ",
         "Add smoked paprika, beans, thyme, chili, and salt, stir well and cook for a further 8-10 minutes stirring occasionally. When they're done, smash half of the beans and add the rest of the oil.",
         "In the meanwhile, toast your slices of bread in the oven or in a pan with a little of olive oil. Cook for a few minutes until golden (I love this method, it adds more flavor)",
         "Right before serving, rub the toasted bread with fresh garlic, top with a spoon of smoky beans a pinch of chili (optional)."
    ]
    
};
let sarahRecipe90 = {
    "name": "Sweet Potato Appetizer Bites",
    "author": "MMAfv3oCQDiL4u10",
    "description": "These sweet potato bites are such a fun party appetizer! You can roast the sweet potato slices in advance, but wait to dice the avocado and make the tartare until the last minute. That way, the avocado will be nice and green when you eat.",
    "datePosted": 1638172867145,
    "servingSize": 4,
    "image": "https://cdn.loveandlemons.com/wp-content/uploads/2017/04/IMG_2017_03_02_09763-1.jpg",
    "tags": ["Appetizer", "Hard", "Vegan", "Vegetarian","Intermediate"],
    "cookTime": "50 mins",
    "difficulty": "4 star",

    "ingredients": {
        "medium sweet potatoes":"2",
        "Extra virgin olive oil":"some",
        "watermelon radish, thinly sliced, cut into half moons":"1",
        "sesame seeds, white or black":"2 teaspoons",
        "sesame oil":"1 teaspoon",
        " fresh lemon juice + more for squeezing":"2 teaspoons",
        "Dijon mustard":"¼ teaspoon",
        "diced red onion":"¼ cup",
        "medium-large ripe avocado":"1",
        "Sea salt":"some"
    },
    "steps": [
         "Preheat the oven to 425°F and line a large baking sheet with parchment paper.",
         "Slice thin rounds (smaller than ¼ inch, not quite as thin as ⅛ inch) from the thick middle of the sweet potatoes. This should yield 14 to 16 rounds. (You can chop up the ends of the sweet potatoes into cubes and roast them for another use).",
         "Place the sweet potatoes on the baking sheet in a single layer, drizzle with olive oil and pinches of salt and pepper, and roast for 20 minutes. Turn the slices and roast for 10 to 15 minutes more, or until tender.",
         "Make the Avocado tartare: In a medium bowl, whisk together the sesame oil, lemon juice, mustard, and a few pinches of salt. Stir in the red onion and set aside.",
         "When the sweet potatoes are almost done, dice the avocado and stir it into the tartare along with an extra squeeze of lemon. Season to taste.",
         "Top the roasted sweet potato rounds with the watermelon radish slices and the avocado tartare. Sprinkle with sesame seeds and coarse salt."
    ]
    
};


// const fakeRecipe = {
//     "name": "Christmas Cake",
//     "author": "Powell's Fanclub",
//     "description": "Christmas cake made by Powell's Fanclu! We're awesome and Merry Christmas!",
//     "datePosted": "2021-04-23T18:25:43.511Z",
//     "serving size": 10,
//     "image": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/frosty-robin-cake-1606392006.jpg",
//     "tags": ["christmas", "party"],
//     "prepTime": "1 hr",
//     "cookTime": "2 hrs",
//     "difficulty": "5 star",
//     "ingredients": ["butter", "flour"],
//     "steps": ["step 1", "step 2"],
//     "comments": ["comment1: amazing!", "comment2: Delicious"]

// }
// fakeuser = {
//     "username": "John",
//     "email": "john@gmail.com",
//     "imageURL": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
//     "savedRecipe": ["saved_recipe1_id", "saved_recipe2_id"],
//     "myRecipe": ["my_recipe3_id", "my_recipe4_id"]
// }
recipeDB.insert(sarahRecipe74, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe75, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe76, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe77, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe78, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe79, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe80, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe81, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe82, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe83, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe84, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe85, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe86, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe87, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe88, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe89, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
recipeDB.insert(sarahRecipe90, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});

// userDB.insert(fakeuser, (err, doc) => {
//     if (!err) {
//         console.log("Inserted", doc.name, "with ID", doc._id);
//     }
// });

// demo2.insert(celia, function (err, doc) {
//     if (!err) {
//         console.log("Inserted", doc.name, "with ID", doc._id);
//     }
// });

// userDB.find({ username: "Jane" }, function (err, doc) {
//     if (!err) {
//         console.log("Found", doc);
//     }
// });

// userDB.remove({ _id: "tHgFbcpGeynDv8hI" }, function (err, doc) {
//     if (!err) {
//         console.log("Removed", doc);
//     }
// });

// userDB.remove({ username: "Jane"}, function (err, doc) {
//     if(!err){
//         console.log("Removed", doc);
//     }
// })
