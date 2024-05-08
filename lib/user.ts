import supertokens from 'supertokens-node';

// Function to get a user by email
export async function getUserByEmail(email: string) {
    try {
        const tenantId: string = "public";
        const userInfo = await supertokens.listUsersByAccountInfo(tenantId, { email });
        return userInfo["0"];
    } catch (error) {
        // Handle error
        console.error('Error getting user by email:', error);
        throw error;
    }
}

// Function to get a user by id
export async function getUserById(id: string) {
    try {
        const user = await supertokens.getUser(id);
        return user;
    } catch (error) {
        // Handle error
        console.error('Error getting user by id:', error);
        throw error;
    }
}

// Function to create a user
export async function createUser(email: string, password: string) {
    try {
        const user = await supertokens.createUser(email, password);
        return user;
    } catch (error) {
        // Handle error
        console.error('Error creating user:', error);
        throw error;
    }
}

// Function to update a user by id
export async function updateUserById(id: string, updates: Partial<User>) {
    try {
        const user = await supertokens.updateUserById(id, updates);
        return user;
    } catch (error) {
        // Handle error
        console.error('Error updating user by id:', error);
        throw error;
    }
}

// Function to update a user by email
export async function updateUserByEmail(email: string, updates: Partial<User>) {
    try {
        const user = await supertokens.updateUserByEmail(email, updates);
        return user;
    } catch (error) {
        // Handle error
        console.error('Error updating user by email:', error);
        throw error;
    }
}

// Function to delete a user by id
export async function deleteUserById(id: string) {
    try {
        await supertokens.deleteUserById(id);
        // Return success message or handle as needed
        return 'User deleted successfully';
    } catch (error) {
        // Handle error
        console.error('Error deleting user by id:', error);
        throw error;
    }
}

// Function to delete a user by email
export async function deleteUserByEmail(email: string) {
    try {
        await supertokens.deleteUserByEmail(email);
        // Return success message or handle as needed
        return 'User deleted successfully';
    } catch (error) {
        // Handle error
        console.error('Error deleting user by email:', error);
        throw error;
    }
}