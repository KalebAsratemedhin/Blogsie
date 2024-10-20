import 'github-markdown-css/github-markdown-light.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { TextField, Button, Box, Paper } from '@mui/material'; 
import { useCreateBlogMutation } from '../../redux/api/blogAPI';
import { useForm, Controller } from 'react-hook-form';
import TagInput from '../shared/TagInput';


const BlogEditor: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      date: new Date().toISOString().slice(0, 10),
      markdown: '',
    },
  });
  const [tags, setTags] = React.useState<string[]>([]);
  const [createBlog, { isLoading, isError, isSuccess }] = useCreateBlogMutation();

  const onSubmit = async (data: any) => {
    console.log("Blog content:", { ...data, tags });
    await createBlog({ ...data, tags });
  };

  return (
    <Box className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                label="Title"
                {...field}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                label="Date"
                type="date"
                {...field}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            )}
          />
          <TagInput tags={tags} setTags={setTags} />
          <Box className="bg-gray-50 p-4 rounded-md mb-4">
            <Controller
              name="markdown"
              control={control}
              render={({ field }) => (
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  height={300}
                  style={{ backgroundColor: 'white', color: 'black' }} 
                />
              )}
            />
          </Box>
          <Box>
            <div className="p-4 bg-gray-50 border rounded-md markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {control._formValues.markdown || ''}
              </ReactMarkdown>
            </div>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Blog'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default BlogEditor;
