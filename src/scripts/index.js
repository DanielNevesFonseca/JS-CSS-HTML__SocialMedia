import { users } from "./database.js";
import { posts } from "./database.js";
import { suggestUsers } from "./database.js";

import { createNewArticle } from "./render.js"
import { renderMainUser } from "./render.js";
import { renderSuggestUsers } from "./render.js";
import { renderAsideSuggestUsers } from "./render.js";
import { renderPosts } from "./render.js";

import { handlePostModal } from "./modal.js";

createNewArticle(users);
renderMainUser(users);
renderSuggestUsers(suggestUsers);
renderAsideSuggestUsers(suggestUsers);
renderPosts(posts);
handlePostModal(posts);

