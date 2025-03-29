import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
    author: "",
    published: true,
    tags: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blogs?all=true`
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (blog = null) => {
    if (blog) {
      setCurrentBlog({
        ...blog,
        tags: blog.tags.join(", "),
      });
      setIsEditing(true);
    } else {
      setCurrentBlog({
        title: "",
        summary: "",
        content: "",
        image: "",
        author: "RepliCar Team", // Default author
        published: true,
        tags: "",
      });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog({
      ...currentBlog,
      [name]: value,
    });
  };

  const handleContentChange = (content) => {
    setCurrentBlog({
      ...currentBlog,
      content: content
    });
  };

  const handleSwitchChange = (e) => {
    setCurrentBlog({
      ...currentBlog,
      published: e.target.checked,
    });
  };

  const handleSubmit = async () => {
    try {
      const blogData = {
        ...currentBlog,
        tags: currentBlog.tags
          ? currentBlog.tags.split(",").map((tag) => tag.trim())
          : [],
      };

      if (isEditing) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/blogs/${currentBlog._id}`,
          blogData
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/blogs`,
          blogData
        );
      }

      fetchBlogs();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/blogs/${id}`
        );
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  // Rich text editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }], // For Hebrew text
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'link', 'image'
  ];

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Blog Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => handleOpenDialog()}
        >
          Create New Post
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No blog posts found. Create your first one!
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    {new Date(blog.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {blog.published ? "Published" : "Draft"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(blog)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Blog Dialog */}
{/* Create/Edit Blog Dialog */}
<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
  <DialogTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
  <DialogContent>
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        name="title"
        label="Title"
        fullWidth
        value={currentBlog.title}
        onChange={handleInputChange}
        required
      />
      <TextField
        name="summary"
        label="Summary"
        fullWidth
        multiline
        rows={2}
        value={currentBlog.summary}
        onChange={handleInputChange}
        required
      />
      <Box>
        <Typography variant="subtitle1" style={{ marginBottom: 8 }}>
          Content
        </Typography>
        <Box sx={{ 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          mb: 2
        }}>
          <ReactQuill 
            value={currentBlog.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            style={{ 
              minHeight: '300px', 
              height: 'auto', 
              marginBottom: '40px' 
            }}
          />
        </Box>
      </Box>
      <TextField
        name="image"
        label="Image URL"
        fullWidth
        value={currentBlog.image}
        onChange={handleInputChange}
        required
      />
      <TextField
        name="author"
        label="Author"
        fullWidth
        value={currentBlog.author}
        onChange={handleInputChange}
      />
      <TextField
        name="tags"
        label="Tags (comma separated)"
        fullWidth
        value={currentBlog.tags}
        onChange={handleInputChange}
      />
      <FormControlLabel
        control={
          <Switch
            checked={currentBlog.published}
            onChange={handleSwitchChange}
            color="primary"
          />
        }
        label="Published"
      />
    </Box>
  </DialogContent>
  <DialogActions sx={{ p: 3 }}>
    <Button onClick={handleCloseDialog}>Cancel</Button>
    <Button 
      onClick={handleSubmit} 
      color="primary" 
      variant="contained"
      disabled={!currentBlog.title || !currentBlog.summary || !currentBlog.content || !currentBlog.image}
    >
      {isEditing ? "Update" : "Create"}
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default BlogManagement;