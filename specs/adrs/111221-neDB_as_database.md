# Persist data generated from static website with neDB

* Status: accepted  
* Deciders: Caiwei Xiao, Bjron Johnson, Eric Filishtiner, Xin Sheng, Kian Ezaz  
* Date: 2021-11-12 

Technical Story: We are trying enable users to see others' uploaded recipes, so we need to way to persist the uploaded recipes. We can't use AWS so we're trying to find an alternative that can serve static page.

## Context and Problem Statement

How to store and public the data without AWS?
Is there a way to use MongoDB API without MongoDB Cloud?

## Decision Drivers 

* Time constaint: we only had ~3 weeks left for code
* Scope: we won't have a large amount of data

## Considered Options

* SQLite
* Github REST API
* neDB

## Decision Outcome

Chosen option: neDB, because it saves data to a file inside a repo, so it's a good way to persist the data generated from a static website. And it follows MongoDB API, so our design of schema matches.  It takes in a file-path and store the data inside the specific file. In this way, we could use MongoDB API to perform query and mutation as well as persist the user generated data inside our repo. 

### Positive Consequences <!-- optional -->

* We can "publish" user uploaded recipes with neDB. The API is easy to use. And with neDB, we could create multiple database instance too, so we could handle several tables at the same time

### Negative Consequences <!-- optional -->

* We need need to store user info, too. But since our project is open source, we shouldn't store the user info in a file inside our repo.

## Pros and Cons of the Options <!-- optional -->

### SQLite

* Good, because it's widely use and proven robust
* Good, because we had some experience using it
* Bad, because it's relational database, but we're trying to use non-relational database to store the recipes.

### Github REST API

* Good, because we published our site with github pages.
* Bad, because it's complicated and takes a lot of time to learn.

### neDB

* Good, because it's popular in Github and has a similar approach as SQLite
* Good, because it follows MongoDB API.
* Bad, because private data concerns.