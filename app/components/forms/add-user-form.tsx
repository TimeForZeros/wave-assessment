import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../components/ui/form';
import { DialogFooter } from '../ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useStore from '../../store';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.email('Invalid email address'),
});

type FormValues = z.infer<typeof formSchema>;

const UserForm = ({
  handleSubmission = () => {},
}: {
  handleSubmission?: () => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', username: '', email: '' },
  });
  const addUser = useStore((state) => state.addUser);

  const onSubmit = (values: FormValues) => {
    addUser(values);
    form.reset();
    handleSubmission();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} id='name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} id='username' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} id='email' type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* TODO: semantically suboptimal, but fuck it, it works! fix if time */}
        <DialogFooter className='mt-4'>
          <Button type='button' variant='outline' onClick={() => handleSubmission()}>
            Cancel
          </Button>
          <Button type='submit'>Add</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserForm;
