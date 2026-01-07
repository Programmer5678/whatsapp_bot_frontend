/*
    Usage --> const handleInputChange = genHandleInputChange(setForm);
    this function generates a handleInputChange based on our setForm 
    */
export function genHandleInputChange<T extends Record<string, string>>
    (setForm: React.Dispatch<React.SetStateAction<T>>) {

    return (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

}