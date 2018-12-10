<head>
  <style>
    form {
      margin:0 auto;
      width:300px
      }
      input {
        margin-bottom:3px;
        padding:10px;
        width: 100%;
        border:1px solid #CCC
      }
      button {
        padding:10px
      }
      label {
        cursor:pointer
      }

  </style>
</head>

<div class="form-header">
  <% if (Object.keys(errors).length === 0) { %>
    <h2>Search for Existing Messages</h2>
  <% } else { %>
    <h2 class="errors-heading">please correct the following:</h2>
    <ul class="errors-list">
      <% Object.values(errors).forEach(error => { %>
        <li><%= error.msg %></li>
      <% }) %>
    </ul>
  <% } %>
</div>


<form id="message-search" action="search" method='get'>
  <div class=" <%=errors.title ? 'form-field-invalid':'form-field'%>">
    <label for="title">Title</label>
    <input class = "input" id = "title" type="text" name = "title" value="<%= data.title %>" />
      <% if (data.title) { %>
        <div class="error">need title</div>
      <% } %>
  </div>
  <div class=" <%= errors.category ? 'form-field-invalid':'form-field'%>">
    <label for="category">Category</label>
    <input class = "input" id = "category" name= "category" value = "<%= data.category %>">
      <% if (errors.category) { %>
        <div class="error">category error</div>
      <% } %>
  </div>
  <div class="form-actions">
    <button class= "btn" type="submit">Submit</button>
  </div>
</form>
