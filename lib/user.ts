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
