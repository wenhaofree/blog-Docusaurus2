---
slug: NextJS&Quick-Start-Guide---Strapi-Developer-Docs-|-Strapi-Documentation
title: NextJS&Quick Start Guide - Strapi Developer Docs | Strapi Documentation 
date: 2023-10-28
authors: wenhao
tags: ['General']
keywords: ['Default']
---
https://docs.strapi.io/dev-docs/quick-start#_1-install-strapi-and-create-a-new-project 

Strapi offers a lot of flexibility. Whether you want to go fast and quickly see the final result, or would rather dive deeper into the product, we got you covered. For this tutorial, we'll go for the DIY approach and build a project and data structure from scratch. 
☑️ Prerequisites 
Before installing Strapi, the following requirements must be installed on your computer: 
- Node.js
- : Only 
- Active LTS or Maintenance LTS versions
-  are supported (currently 
- v18
-  and 
- v20
- ). Odd-number releases of Node, known as "current" versions of Node.js, are not supported (e.g. v19, v21).
- Your preferred Node.js package manager:
- npm
-  (
- v6
-  and above)
- yarn
- Python
-  (if using a SQLite database)
## 🚀 Part A: Create a new project with Strapi

<!-- truncate -->

### Step 1: Run the installation script

Run the following command in a terminal: 
- yarn
- npm
```plain text
yarn create strapi-app my-project --quickstart

```
👀 Info 
The  quick start  installation sets up Strapi with a SQLite database. Other databases and installation options are available (see  CLI installation guide ). 
### Step 2: Register the first administrator user

Once the installation is complete, your browser automatically opens a new tab. 
By completing the form, you create your own account. Once done, you become the first administrator user of this Strapi application. Welcome aboard, commander! 
You now have access to the  admin panel : 
![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/b0012720-ccd1-41ef-9ca9-02f55a45f30f/b3e07421-0d50-42f6-b31e-d5b53feef032/qsg-handson-part1-01-admin_panel-568a4a5b98f73196b58999f32abb8ea0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231125T072113Z&X-Amz-Expires=3600&X-Amz-Signature=fd7e9c9b66dd208d591e3df791813b709952b96bc37688ed3aef2c428bb07dcb&X-Amz-SignedHeaders=host&x-id=GetObject)
Admin panel screenshot: dashboard 
🥳 CONGRATULATIONS! 
You have just created a new Strapi project! You can start playing with Strapi and discover the product by yourself using our  User Guide , or proceed to part B below. 
## 🛠 Part B: Build your content

<!-- truncate -->

The installation script has just created an empty project. We will now guide you through creating a restaurants directory, inspired by our  FoodAdvisor  example application. 
In short, we will create a data structure for your content, then add some entries and publish them, so that the API for your content can be consumed. 
The admin panel of Strapi runs at  http://localhost:1337/admin . This is where you will spend most of your time creating and updating content. 
### Step 1: Create collection types with the Content-type Builder

The Content-type Builder plugin helps you create your data structure. When creating an empty project with Strapi, this is where to get the party started! 
### Create a "Restaurant" collection type

Your restaurants directory will eventually include many restaurants, so we need to create a "Restaurant" collection type. Then we can describe the fields to display when adding a new restaurant entry: 
- Click on the 
- Create your first Content type
-  button.
- If it's not showing up, go to Plugins 
- Content-type Builder
-  in the main navigation.
- Click on 
- Create new collection type
- .
- Type 
- Restaurant
-  for the 
- Display name
- , and click 
- Continue
- .
- Click the Text field.
- Type 
- Name
-  in the 
- Name
-  field.
- Switch to the 
- Advanced Settings
-  tab, and check the 
- Required field
-  and the 
- Unique field
-  settings.
- Click on 
- Add another field
- .
- Choose the Rich text field.
- Type 
- Description
-  under the 
- Name
-  field, then click 
- Finish
- .
- Finally, click 
- Save
-  and wait for Strapi to restart.
![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/b0012720-ccd1-41ef-9ca9-02f55a45f30f/bc27762a-9005-47a4-aefb-ebdb3cad4aac/qsg-handson-restaurant_2-2ee38a0d078171e934b91964ad868433.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231125T072113Z&X-Amz-Expires=3600&X-Amz-Signature=8caea6cd1c36348ceba853092a59790a63830b10b0939bf679b7d955d9994c03&X-Amz-SignedHeaders=host&x-id=GetObject)
GIF: Create Restaurant collection type in Content-type Builder 
Once Strapi has restarted, "Restaurant" is listed under   Content Manager > Collection types  in the navigation. Wow, you have just created your very first content-type! It was so cool — let's create another one right now, just for pleasure. 
### Create a "Category" collection type

It would help getting a bit more organized if our restaurants directory had some categories. Let's create a "Category" collection type: 
- Go to Plugins 
- Content-type Builder
-  in the main navigation.
- Click on 
- Create new collection type
- .
- Type 
- Category
-  for the 
- Display name
- , and click 
- Continue
- .
- Click the Text field.
- Type 
- Name
-  in the 
- Name
-  field.
- Switch to the 
- Advanced Settings
-  tab, and check the 
- Required field
-  and the 
- Unique field
-  settings.
- Click on 
- Add another field
- .
- Choose the Relation field.
- In the center, select the icon that represents "many-to-many" . The text should read 
- Categories has and belongs to many Restaurants
- .
![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/b0012720-ccd1-41ef-9ca9-02f55a45f30f/3237e13c-5c3f-4f6b-ab7c-0814a99564bb/qsg-handson-part2-02-collection_ct-2a14d491498723885d78e6d85103800e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231125T072113Z&X-Amz-Expires=3600&X-Amz-Signature=b646a160b92ea3aff0d0ed513ce4f813f220c26bd599a8f3c37552c32bf58623&X-Amz-SignedHeaders=host&x-id=GetObject)
Admin Panel screenshot: relations 
- Finally, click 
- Finish
- , then the 
- Save
-  button, and wait for Strapi to restart.
### Step 2: Use the collection types to create new entries

Now that we have created a basic data structure with 2 collection types, "Restaurant" and "Category", let's use them to actually add content by creating new entries. 
### Create an entry for the "Restaurant" collection type

- Go to 
- Content Manager > Collection types - Restaurant
-  in the navigation.
- Click on 
- Create new entry
- .
- Type the name of your favorite local restaurant in the 
- Name
-  field. Let's say it's 
- Biscotte Restaurant
- .
- In the 
- Description
-  field, write a few words about it. If you're lacking some inspiration, you can use 
- Welcome to Biscotte restaurant! Restaurant Biscotte offers a cuisine based on fresh, quality products, often local, organic when possible, and always produced by passionate producers.
- Click 
- Save
- .
![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/b0012720-ccd1-41ef-9ca9-02f55a45f30f/39af4315-ae11-4b3a-bb81-196a8d48e128/qsg-handson-part2-03-restaurant-f05b1f47d4b751548c50bdf943c4f0b6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231125T072113Z&X-Amz-Expires=3600&X-Amz-Signature=6c0c5f3436352946484bd3ee19a0ada76af246c2f9a7dad3dc0cd9f447defab3&X-Amz-SignedHeaders=host&x-id=GetObject)
Screenshot: Biscotte Restaurant in Content Manager 
The restaurant is now listed in the  Collection types - Restaurant  view. 
### Add Categories

Let's go to   Content Manager > Collection types - Category  and create 2 categories: 
- Click on 
- Create new entry
- .
- Type 
- French Food
-  in the 
- Name
-  field.
- Click 
- Save
- .
- Go back to 
- Collection types - Category
- , then click again on 
- Create new entry
- .
- Type 
- Brunch
-  in the 
- Name
-  field, then click 
- Save
- .
![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/b0012720-ccd1-41ef-9ca9-02f55a45f30f/55b19d58-6525-455d-91df-bd7619323870/qsg-handson-categories-32a80cf79de661b526e74e4e09b5e11f.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231125T072113Z&X-Amz-Expires=3600&X-Amz-Signature=ec640307c502ae31a1fbd0aef34b6e4fe0bc7ebb4f2f3a2f4a00b41f1ee8a35c&X-Amz-SignedHeaders=host&x-id=GetObject)
GIF: Add Categories 
The "French Food" and "Brunch" categories are now listed in the  Collection types - Category  view. 
### Add a Category to a Restaurant

Go to   Content Manager > Collection types - Restaurant  in the navigation, and click on "Biscotte Restaurant". 
In the  Categories  drop-down list, select "Brunch". Click  Save . 
### Step 3: Set Roles & Permissions

We have just added a restaurant and 2 categories. We now have enough content to consume (pun intended). But first, we need to make sure that the content is publicly accessible through the API: 
- Click on 
- General Settings
-  at the bottom of the main navigation.
- Under 
- Users & Permissions Plugin
- , choose 
- Roles
- .
- Click the 
- Public
-  role.
- Scroll down under 
- Permissions
- .
- In the 
- Permissions
-  tab, find 
- Restaurant
-  and click on it.
- Click the checkboxes next to 
- find
-  and 
- findOne
- .
- Repeat with 
- Category
- : click the checkboxes next to 
- find
-  and 
- findOne
- .
- Finally, click 
- Save
- .
![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/b0012720-ccd1-41ef-9ca9-02f55a45f30f/02110812-7a98-4897-a9e4-658efbdbd9dd/qsg-handson-part2-04-roles-f070654726473dc2e11d5c82b2deac20.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231125T072113Z&X-Amz-Expires=3600&X-Amz-Signature=c56990bd6fbe14cb4bdb4077cea83745b03f12da11627d2ed85a83e21dfdf6ef&X-Amz-SignedHeaders=host&x-id=GetObject)
Screenshot: Public Role in Users &amp; Permissions plugin 
### Step 4: Publish the content

By default, any content you create is saved as a draft. Let's publish our categories and restaurant. 
First, navigate to   Content Manager > Collection types - Category . From there: 
- Click the "Brunch" entry.
- On the next screen, click 
- Publish
- .



 > 在遵循创作的康庄大道上，若我的文字不慎踏入了他人的花园，请告之我，我将以最快的速度，携带着诚意和尊重，将它们从您的视野中撤去。
