"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'email' | 'switch' | 'select';
  description?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

interface FormViewProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function FormView({ fields, onSubmit, initialData }: FormViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate Zod schema dynamically based on fields
  const generateSchema = () => {
    const schema: { [key: string]: any } = {};
    
    fields.forEach((field) => {
      let fieldSchema = z.string();
      
      if (field.type === 'number') {
        fieldSchema = z.number();
      } else if (field.type === 'email') {
        fieldSchema = z.string().email();
      } else if (field.type === 'switch') {
        fieldSchema = z.boolean();
      }

      if (field.validation?.required) {
        fieldSchema = fieldSchema.min(1, { message: `${field.label} is required` });
      }

      if (field.validation?.minLength) {
        fieldSchema = fieldSchema.min(field.validation.minLength);
      }

      if (field.validation?.maxLength) {
        fieldSchema = fieldSchema.max(field.validation.maxLength);
      }

      schema[field.name] = fieldSchema;
    });

    return z.object(schema);
  };

  const form = useForm({
    resolver: zodResolver(generateSchema()),
    defaultValues: initialData || {},
  });

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === 'textarea' ? (
                    <Textarea
                      {...formField}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'switch' ? (
                    <Switch
                      checked={formField.value}
                      onCheckedChange={formField.onChange}
                    />
                  ) : field.type === 'select' ? (
                    <Select
                      value={formField.value}
                      onValueChange={formField.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      {...formField}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  )}
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}