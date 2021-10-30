With inspiration from the [W21 CSE 11 Style Guidelines](https://cseweb.ucsd.edu//~ricko/CSE11StyleGuidelines.pdf) and [Google Suggested Coding Guidelines](https://google.github.io/styleguide/jsguide.html).

## Formatting
**Braces**
- Required for any ```if, else, for, do, while, switch``` statements
- Follow the Kernighan and Ritchie style:
  - No line break before the opening brace.
  - Line break after the opening brace.
  - Line break before the closing brace.
  - No line break after the closing brace if it is followed by else, catch, while, comma, semicolon.
  
**Statements**
- New line after every statement
- Every statement must end with a semicolon

**Line Wrapping**
- Column limit of 80 characters; i.e. make a newline to prevent any line form reaching 80+ characters
- A new line of a continuing statement must be indented 1 more block than the original line
- How to break line wrapping:
  - Break at the highest symantic level
  - Symantic levels (highest to lowest)
    - Assignment
    - Division
    - Function call
    - Parameters
    - Number constant
    ``` meanOfNumbers =
            mean(start + countOfRemainingNumbers *      
                RemainingNumbersValue) / countOfAll;
    ```

**Comments**
- Block comments are preferable if comments are 1+ lines
- Single-line comments work for single-line comments

## Naming
- Name classes, functions, variables, etc. in camelCase
- Classes, functions, variables, parameters, etc. must be descriptive within reason
  - Avoid using unfamiliar or ambiguous abbreviations

**Constants**
- Constants must be written in all caps
- Spaces can be indicated using snake_case

**Magic Numbers**
- Magic numbers, which are any numbers that are not -1, 0, 1 must be stored as a constant

## Language Features
- Declare all local variables using ```const``` and ```let```
- Every local variable declaration must declare only 1 variable

**String literals**
- Use single quotes (') to indicate a string literal

## JSDoc
**File Headers**
- Required at the top of every file
- Must describe the usage of the file
  ```
  Filename: filename.languageType
  Date: MM/DD/YR
  Purpose: 1-3 sentences
  ```

**Class Header**
- Required for every class created
- Description of the class and what it is used for, 1-2 lines

**Method Headers**
- Directly above said method itself
- 1-2 sentence description, along with descriptions of the parameters and return types
 ```
  1-2 sentence description. Purpose of method.

  param {type} nameOfParam1 State what this parameter represents.
  param {type} nameOfParam2 State what this parameter represents.
  @param {type} nameOfParam3 State what this parameter represents.
  @return Specify what the return value represents.
  ```
