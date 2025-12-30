import { ConnectionStateResponse } from '../../header/types';
import { JobTreeResponse } from '../../workspace/current-jobs/types';
import { Raf0RequestModel, MavdakRequestModel, HakhanaRequestModel, VeadatKevaRequestModel } from '../../workspace/new-actions/types';
const API_BASE_URL = 'http://localhost:8000';
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
  async reconnect(): Promise<{
    qr_code: string;
  }> {
    const response = await fetch(`${API_BASE_URL}/connection/connect`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to reconnect');
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      const text = await response.text();
      return {
        qr_code: text.replace(/"/g, '')
      };
    }
  }
  async getAllJobs(): Promise<JobTreeResponse> {
    return this.request<JobTreeResponse>('/jobs/all');
  }
  async deleteJobBatch(batchId: string): Promise<void> {
    await this.request(`/jobs/batch/${encodeURIComponent(batchId)}`, {
      method: 'DELETE'
    });
  }
  async deleteJob(jobId: string): Promise<void> {
    await this.request(`/jobs/job/${encodeURIComponent(jobId)}`, {
      method: 'DELETE'
    });
  }
  async createRaf0(data: Raf0RequestModel): Promise<void> {
    await this.request('/group_creates/raf0', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  async createMavdak(data: MavdakRequestModel): Promise<void> {
    await this.request('/group_creates/mavdak', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  async createHakhana(data: HakhanaRequestModel): Promise<void> {
    await this.request('/group_creates/hakhana', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  async createVeadatKeva(data: VeadatKevaRequestModel): Promise<void> {
    await this.request('/group_creates/veadat_keva', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}
export const api = new ApiService();