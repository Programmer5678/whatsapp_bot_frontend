import { ConnectionStateResponse } from '../../header/types';
import { JobTreeResponse } from '../../workspace/current-jobs/types';
import { Raf0RequestModel, MavdakRequestModel, HakhanaRequestModel, VeadatKevaRequestModel } from '../../workspace/new-actions/types';
const API_BASE_URL = 'http://127.0.0.1:8000';
class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }
  async getConnectionState(): Promise<ConnectionStateResponse> {
    return this.request<ConnectionStateResponse>('/connection/connection_state');
  }
  async connect(number: string, apiKey: string): Promise<{
    qr_code: string;
  }> {
    const requestBody = {
      number,
      api_key: apiKey
    };
    const response = await fetch(`${API_BASE_URL}/connection/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) throw new Error('Failed to reconnect');
    try {
      return {
        qr_code: (await response.json())['qr_code']
      };
    } catch {
      return {
        qr_code: ''
      };
    }
  }
  async getAllJobs(): Promise<JobTreeResponse> {
    return this.request<JobTreeResponse>('/job/get_all_jobs');
  }
  async deleteJobBatch(batchId: string): Promise<void> {
    await this.request(`/job/delete_job_batch?batch_id=${encodeURIComponent(batchId)}`, {
      method: 'DELETE'
    });
  }
  async deleteJob(jobId: string): Promise<void> {
    await this.request(`/job/delete_job?job_id=${encodeURIComponent(jobId)}`, {
      method: 'DELETE'
    });
  }
  async createRaf0(data: Raf0RequestModel): Promise<void> {
    await this.request('/create_group/raf0', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  async createMavdak(data: MavdakRequestModel): Promise<void> {
    await this.request('/create_group/mavdak', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  async createHakhana(data: HakhanaRequestModel): Promise<void> {
    await this.request('/create_group/hakhana', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  async createVeadatKeva(data: VeadatKevaRequestModel): Promise<void> {
    await this.request('/create_group/veadat_keva', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}
export const api = new ApiService();