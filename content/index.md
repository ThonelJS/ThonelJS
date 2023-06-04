## About

I wanted to host a simple website somewhere and know that it would not go down when I forget to pay the hosting. That is why I chose Github Pages as my hosting platform. Github Pages only has one problem. I do not want to write HTML. This lead to ThonelJS creation. ThonelJS automatically generates new HTML and updates it to the git repository.

I also made a simple web server which made it possible to preview the website locally at [localhost:8000](http://localhost:8000). 

[Read more...](about.html)

## Usage

As a blogger you should only focus onto the `content` folder and most specifically `articles` folder inside it. `articles` folder contains your blog posts. The title will be grabbed from the filename (`.md` suffix will be removed) so writing title inside markdown file is unnecessary (and leads to duplicate title). 

`/content/info.json` is like your blog settings. It uses JSON to store the website title and description. 

`/content/index.md` is the frontpage of your website. If you rename or remove it the frontpage will show a list of all the blog posts. The same applies to `/content/about.md` which will be shown only if it exists.

If you want to preview the changes before pushing them (very much RECOMMENDED) you can do that by running `node .` in the ThonelJS folder. This although requires Node.JS to be installed on your machine.

## Bugs

See them [here](Common%20bugs)