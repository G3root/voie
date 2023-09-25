"use client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  jobCreateFormSchema,
  TJobCreateFormSchema,
  JobLevelMap,
  JobTypeMap,
  JobLocationTypeMap,
} from "@/zod-schemas/job";
import { Button } from "@/components/ui/button";
import { createJob } from "@/queries/job";
import { RotateCw } from "lucide-react";

export const JobCreateForm = () => {
  const form = useForm<TJobCreateFormSchema>({
    resolver: zodResolver(jobCreateFormSchema),
  });

  const onSubmit = async (data: TJobCreateFormSchema) => {
    const res = await createJob(data);

    if (res.success) {
      toast.success("job created successfully");
    } else {
      toast.success(`error: ${res.message}`);
    }
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <Card>
      <CardHeader />
      <CardContent className="max-w-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            id="create-job-form"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(JobLevelMap).map((val) => (
                        <SelectItem key={val} value={val}>
                          {JobLevelMap[val as keyof typeof JobLevelMap]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(JobLocationTypeMap).map((val) => (
                        <SelectItem key={val} value={val}>
                          {
                            JobLocationTypeMap[
                              val as keyof typeof JobLocationTypeMap
                            ]
                          }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(JobTypeMap).map((val) => (
                        <SelectItem key={val} value={val}>
                          {JobTypeMap[val as keyof typeof JobTypeMap]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button disabled={isLoading} type="submit" form="create-job-form">
          {isLoading ? (
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};
