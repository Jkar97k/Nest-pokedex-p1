export interface TaskResponse {
    id:                    string;
    email:                 string | null;
    username:              string | null;
    first_name:            string | null;
    last_name:             string | null;
    bio:                   string | null;
    avatar_url:            string | null;
    birth_date:            Date | null;
    gender:                string | null;
    phone:                 string | null;
    privacy:               boolean | null;
    receive_notifications: boolean | null;
    last_login:            Date | null;
    status:                string | null;
}
