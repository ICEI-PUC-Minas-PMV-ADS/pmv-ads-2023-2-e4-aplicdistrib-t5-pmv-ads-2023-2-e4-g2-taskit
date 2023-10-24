import { useState } from "react";

interface FormItem {
    label: string;
    placeholder: string;
    type: string;
    value: string;
    required?: boolean;
}

interface UpdateFormItem {
    name: string;
    value: string;    
}

interface UpdateRequiredItem {
    name: string;
    required: boolean;    
}

interface Form {
    [key: string]: FormItem;
}

export function useForm(init: Form) {
    const [form, setForm] = useState<Form>(init);

    function handleInput({ target: { name, value } }: { target: UpdateFormItem }) {
        setForm({
            ...form,
            [name]: { ...form[name], value }
        });
    }

    function isValid() {
        return Object.values(form).every(({ value, required }) => {
            return value.length > 3 || !required;
        });
    }

    return { form, handleInput, setForm, isValid };
}
