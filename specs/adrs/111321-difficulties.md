# Are difficulties tags?

* Status: Accepted
* Deciders: Serina, Danica, Tallis, Euvin
* Date: 11-13-2021

Technical Story: Difficulties was a filtering system that was proposed to be added to recipes. Each recipe would have to be described as “Easy”, “Intermediate”, or “Advanced”. There also exists a separate filtering system called tags, that allows users to filter using various options, including tags for kind of meat, type of meal, etc.

## Context and Problem Statement

Difficulties and tags are similar filtering systems, the key difference being that a user is allowed to not use any tags, but at least one difficulty option must be chosen. The two also have different UI representations. However, both functionally serve the same purpose, and a proposal was made to make difficulties into a tags option.

## Decision Drivers

* Similar filtering systems - it seems unnecessary to have 2 systems performing the same action when they could be easily merged
* Difficulties does not need to be required

## Considered Options

* Option 1: Allowing difficulties and tags to remain separate visually and inputted-wise
* Option 2: Allow difficulties to be inputted via a dropdown menu and be required, but have it stored as a tag and displayed visually as a tag
* Option 3: Make difficulties as a tag

## Decision Outcome

Chosen option: “{option 3}”, because it was the simplest answer, the easiest to implement, and the least confusing for the user

### Positive Consequences

* Will take less time to implement than other options, because it uses one filtering system
* The user will not be confused by multiple filtering systems/options

### Negative Consequences

* Difficulties as a feature is compromised slightly
