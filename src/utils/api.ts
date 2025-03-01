export const fetchGroupedCategories = async () => {
    try {
        const response = await fetch(`http://localhost:3001/categories/grouped`);
        if (!response.ok) throw new Error("Failed to fetch categories");

        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return {};
    }
};
// src/utils/functions.ts
export const fetchCategoryServices = async (type: string, category: string) => {
    const response = await fetch(`http://localhost:3001/categories/${type}/${category}`);
    if (!response.ok) {
        throw new Error('Failed to fetch category services');
    }
    return response.json();
};

