interface loginPayload {
  username: string;
  password: string;
}

interface loginResponse {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  surplus: string;
}

interface tuitionResponse {
  full_name: string;
  tuition_fee: string;
  tuition_status: number;
}

export { loginResponse, loginPayload, tuitionResponse };
