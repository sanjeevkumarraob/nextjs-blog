'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import Highlight from '@tiptap/extension-highlight'
import { cn } from '@/lib/utils'
import { 
  Bold, 
  Italic, 
  Code, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  Quote,
  ListOrdered,
  List
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'

interface EditorProps {
  initialContent?: string
  onChange: (content: string) => void
  placeholder?: string
}

// Define types for the blobInfo and progress parameters
interface BlobInfo {
  blob: () => File;
  filename: () => string;
}

export function Editor({ initialContent = '', onChange, placeholder = 'Start writing...' }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Tell your story...',
        emptyEditorClass: 'is-editor-empty',
      }),
      CodeBlock,
      Highlight,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-8 py-4',
      },
    },
  })

  if (!editor) {
    return null
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      if (!file) {
        throw new Error('No file selected');
      }
      
      // Log file details for debugging
      console.log('Uploading file:', file.name, file.type, file.size);
      
      // Create a unique file name to prevent collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;
      
      // Initialize Supabase client (client-side)
      const supabase = createClientComponentClient();
      
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('images') // Make sure this bucket exists in your Supabase project
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
        
      if (error) {
        console.error('Supabase storage error:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('Upload failed: No data returned');
      }
      
      // Get the public URL for the uploaded image
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
        
      // Use the direct URL - no proxy needed now
      console.log('Image URL:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleLinkAdd = () => {
    const url = window.prompt('Enter the URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="sticky top-[4.5rem] z-40 -mx-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-screen-lg flex flex-wrap gap-1.5 py-2 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-muted' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-muted' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'bg-muted' : ''}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'bg-muted' : ''}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-muted' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-muted' : ''}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLinkAdd}
            className={editor.isActive('link') ? 'bg-muted' : ''}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'image/*'
              
              input.onchange = async () => {
                if (input.files?.length) {
                  try {
                    const file = input.files[0]
                    // Show loading toast
                    toast.loading('Uploading image...')
                    
                    const url = await handleImageUpload(file)
                    
                    // Update editor content without resetting form
                    editor.chain().focus().setImage({ src: url, alt: file.name }).run()
                    
                    // Show success toast
                    toast.success('Image uploaded successfully')
                  } catch (error) {
                    console.error('Failed to upload image:', error)
                    toast.error('Failed to upload image. Please try again.')
                  }
                }
              }
              
              input.click()
            }}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-8 bg-muted/30 rounded-lg border">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
} 