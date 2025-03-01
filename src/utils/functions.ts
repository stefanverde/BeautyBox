export const isEmpty = (
    field: string,
    setErrorText: (value: string) => void,
):boolean => {
    if (field.trim() === "") {
        setErrorText("Campul nu poate fi gol");
        return true;
    } else {
        setErrorText("");
        return false;
    }
};

export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

