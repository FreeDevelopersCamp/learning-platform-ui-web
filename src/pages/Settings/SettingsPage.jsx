import styled from 'styled-components';

import UserAvatar from '@/features/authentication/UserAvatar.jsx';
import CustomDatePicker from './DatePicker.jsx';
import 'react-datepicker/dist/react-datepicker.css';

import Spinner from '@/ui/Spinner.jsx';

import { useSession } from '@/apis/auth/Auth/hooks/useSession.js';
import { useGetUser } from '@/apis/core/User/hooks/useGetUser.ts';
import { useGetProfile } from '@/apis/core/Profile/hooks/useGetProfile.ts';
import { toast } from 'react-hot-toast';
import { useRef, useState } from 'react';
import { useUpdateUser } from '@/apis/core/User/hooks/useUpdateUser.ts';
import { useUpdateProfile } from '@/apis/core/Profile/hooks/useUpdateProfile.ts';

const Container = styled.div`
  display: flex;
  background-color: var(--color-grey-0);
  padding: 2rem;
  margin: 0 auto;
  width: 65%;
  gap: 2rem;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 22%;
  font-size: 2.8rem;
  font-weight: bold;
  gap: 1rem;

  h1 {
    width: 100%;
    font-weight: 600;
    color: var(--color-grey-900);
  }
`;

const Sidebar = styled.div`
  width: 100%;
  background-color: var(--color-coolgray-100);
  border-radius: 8px;
  margin-right: 2rem;
`;

const SidebarItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.6rem;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  color: var(--color-grey-700);
  cursor: pointer;
  border: 1px solid var(--color-grey-100);

  background-color: ${(props) =>
    props.active ? 'var(--color-grey-0)' : 'transparent'};

  &:hover {
    background-color: var(--color-grey-0);
  }

  &:active {
    background-color: var(--color-coolgray-100);
  }

  span {
    font-size: 2rem;
  }
`;

const Content = styled.div`
  flex: 1;
  background-color: var(--color-grey-0);
  border-radius: 8px;
  padding: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 3rem;
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-skyblue-900);
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    background-color: var(--color-coolgray-800);
    color: var(--color-grey-50);
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-skyblue-900);
  background-color: var(--color-theme-500);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    background-color: var(--color-coolgray-600);
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
`;

const FormRow = styled.div`
  //margin-bottom: 2rem;
  margin-top: 2rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
`;

const FormArea = styled.textarea`
  width: 100%;
  height: 150px; /* Increased height */
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  resize: vertical; /* Allows user to resize vertically */
`;

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
`;

const SettingsPage = () => {
  const { session, isLoading } = useSession();
  const { user, userLoading } = useGetUser(session?.username);
  const { profile, profileLoading } = useGetProfile(session?.username);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user?.personalInformation?.name?.first || '',
    secondName: user?.personalInformation?.name?.second || '',
    thirdName: user?.personalInformation?.name?.third || '',
    lastName: user?.personalInformation?.name?.last || '',
    email: user?.contacts?.email || '',
    phone: user?.contacts?.mobile?.mobile || '',

    state: profile?.state || '',
    headline: profile?.headline || '',
    position: profile?.position || '',
    about: profile?.about || '',
    accounts: profile?.accounts || [],
    work: profile?.work || {},
    certifications: profile?.certifications || {},
    experiences: profile?.experiences || {},
    startDate: profile?.experience?.startDate || null, // Default value
    endDate: profile?.experience?.endDate || null, // Default value
  });

  const { mutate: updateUser, isLoading: updatingUser } = useUpdateUser();
  const { mutate: updateProfile, isLoading: updatingProfile } =
    useUpdateProfile();

  const fileInputRef = useRef(null);

  if (
    isLoading ||
    userLoading ||
    !session ||
    !user ||
    profileLoading ||
    !profile ||
    updatingUser ||
    updatingProfile
  )
    return <Spinner />;

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log('File selected:', file);
      setSelectedFile(file); // Save the file in state for later submission
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parentField, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: prev[parentField].map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  async function handleSubmit() {
    try {
      // Update user data
      updateUser({
        _id: user._id,
        personalInformation: {
          name: {
            first: formData.firstName || user.personalInformation.name.first,
            second: formData.secondName || user.personalInformation.name.second,
            third: formData.thirdName || user.personalInformation.name.third,
            last: formData.lastName || user.personalInformation.name.last,
          },
        },
        contacts: {
          email: formData.email || user.contacts.email,
          mobile: { mobile: formData.phone || user.contacts.mobile.mobile },
        },
      });

      console.log('Accounts:', formData);

      // Update profile data
      updateProfile({
        state: formData.state || profile.state,
        headline: formData.headline || profile.headline,
        position: formData.position || profile.position,
        about: formData.about || profile.about,
        accounts: formData.accounts || profile.accounts,
        work: formData.work || profile.work,
        certifications: formData.certifications || profile.certifications,
        experience:
          {
            experiences: {
              ...formData.experience,
              startDate: formData.startDate,
              endDate: formData.endDate,
            },
          } || profile.experiences,
      });

      // Update Image data
      // updateImage(selectedFile, user._id);

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  }

  return (
    <Container>
      <LeftSection>
        <h1>Account Settings</h1>
        <Sidebar>
          <SidebarItem active>
            Profile <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Subscription <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Notifications <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Social <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Password <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            Emails <span>&gt;</span>
          </SidebarItem>
          <SidebarItem>
            More <span>&gt;</span>
          </SidebarItem>
        </Sidebar>
      </LeftSection>
      <Content>
        <ProfileSection>
          <UserAvatar user={user} size={'8rem'} />
          <UploadButton onClick={handleUploadClick}>
            Upload New Picture
          </UploadButton>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange} // Trigger file upload on change
          />
          <SubmitButton onClick={handleSubmit}>Save Updates</SubmitButton>
        </ProfileSection>
        <Form>
          <FormRow>
            <Label>First name</Label>
            <Input
              type="text"
              placeholder="First name"
              defaultValue={user.personalInformation.name.first || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>Second name</Label>
            <Input
              type="text"
              placeholder="Second name"
              defaultValue={user.personalInformation.name.second || ''}
              onChange={(e) => handleChange('secondName', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>Third name</Label>
            <Input
              type="text"
              placeholder="Third name"
              defaultValue={user.personalInformation.name.third || ''}
              onChange={(e) => handleChange('thirdName', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>Last name</Label>
            <Input
              type="text"
              placeholder="Last name"
              defaultValue={user.personalInformation.name.last || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>E-mail address</Label>
            <Input
              type="email"
              placeholder="Email"
              defaultValue={user.contacts.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>Phone</Label>
            <Input
              type="text"
              placeholder="Phone"
              defaultValue={user?.contacts?.mobile?.mobile || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>State</Label>
            <Input
              type="text"
              placeholder="State"
              defaultValue={profile?.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>Headline</Label>
            <Input
              type="text"
              placeholder="Headline"
              defaultValue={profile?.headline || ''}
              onChange={(e) => handleChange('headline', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>College/University</Label>
            <Input
              type="text"
              placeholder="College/University"
              defaultValue={profile?.position || ''}
              onChange={(e) => handleChange('college', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>About Section</Label>
            <FormArea
              placeholder="Write something about yourself..."
              defaultValue={profile?.about || ''}
              onChange={(e) => handleChange('about', e.target.value)}
            />
          </FormRow>
          {profile?.accounts?.map((account) => {
            return (
              <div
                key={`${account.name}-${account.url}`}
                className="flex flex-row gap-4"
              >
                <FormRow className="w-full">
                  <Label>Account Name</Label>
                  <Input
                    type="text"
                    placeholder="Account Name"
                    defaultValue={account.name || ''}
                    onChange={(e) =>
                      handleChange('accountName', e.target.value)
                    }
                  />
                </FormRow>
                <FormRow className="w-full">
                  <Label>Account URL</Label>
                  <Input
                    type="text"
                    placeholder="Account URL"
                    defaultValue={account.url || ''}
                    onChange={(e) => handleChange('accountURL', e.target.value)}
                  />
                </FormRow>
              </div>
            );
          })}
          <FormRow className="w-full">
            <Label>Work section subtitle</Label>
            <Input
              type="text"
              placeholder="Work section subtitle"
              defaultValue={profile.work.subtitle || ''}
              onChange={(e) => handleChange('workSubtitle', e.target.value)}
            />
          </FormRow>
          {profile?.work?.works?.map((work) => {
            return (
              <div
                key={`${work.name}-${work.description}`}
                className="flex flex-col gap-4"
              >
                <FormRow>
                  <Label>Work Name</Label>
                  <Input
                    type="text"
                    placeholder="Work Name"
                    defaultValue={work.name || ''}
                    onChange={(e) => handleChange('workName', e.target.value)}
                  />
                </FormRow>
                <FormRow>
                  <Label>Work Description</Label>
                  <FormArea
                    placeholder="Write work description yourself..."
                    defaultValue={work?.description || ''}
                    onChange={(e) =>
                      handleChange('workDescription', e.target.value)
                    }
                  />
                </FormRow>
                <div className="flex flex-row gap-4">
                  <FormRow className="w-full">
                    <Label>Skill Name</Label>
                    <Input
                      type="text"
                      placeholder="Skill Name"
                      defaultValue={work?.skills[0] || ''}
                      onChange={(e) =>
                        handleChange('skillName', e.target.value)
                      }
                    />
                  </FormRow>
                  <FormRow className="w-full">
                    <Label>Skill Name</Label>
                    <Input
                      type="text"
                      placeholder="Skill Name"
                      defaultValue={work?.skills[1] || ''}
                      onChange={(e) =>
                        handleChange('skillName', e.target.value)
                      }
                    />
                  </FormRow>
                  <FormRow className="w-full">
                    <Label>Skill Name</Label>
                    <Input
                      type="text"
                      placeholder="Skill Name"
                      defaultValue={work?.skills[2] || ''}
                      onChange={(e) =>
                        handleChange('skillName', e.target.value)
                      }
                    />
                  </FormRow>
                </div>
              </div>
            );
          })}
          <FormRow>
            <Label>Certifications section subtitle</Label>
            <Input
              type="text"
              placeholder="Certifications section subtitle"
              defaultValue={profile?.certifications?.subtitle || ''}
              onChange={(e) =>
                handleChange('certificationsSubtitle', e.target.value)
              }
            />
          </FormRow>
          <FormRow>
            <Label>Course Completion</Label>
            <Input
              type="text"
              placeholder="Course Completion"
              defaultValue={profile?.completedContent?.subtitle || ''}
              onChange={(e) => handleChange('courseComplete', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label>Experience</Label>
            <Input
              type="text"
              placeholder="Experience"
              defaultValue={profile?.experience?.subtitle || ''}
              onChange={(e) =>
                handleChange('experienceSubtitle', e.target.value)
              }
            />
          </FormRow>

          {profile?.experience?.experiences?.map((experience) => {
            return (
              <div key={`${experience?.name}-${experience.company}`}>
                <FormRow>
                  <Label>Experience Name</Label>
                  <Input
                    type="text"
                    placeholder="Experience Name"
                    defaultValue={experience?.name || ''}
                    onChange={(e) =>
                      handleNestedChange(
                        'experience',
                        // eslint-disable-next-line no-undef
                        index,
                        'name',
                        e.target.value,
                      )
                    }
                  />
                </FormRow>
                <FormRow>
                  <Label>Company</Label>
                  <Input
                    type="text"
                    placeholder="Company"
                    defaultValue={experience?.company || ''}
                    onChange={(e) =>
                      handleNestedChange(
                        'experience',
                        // eslint-disable-next-line no-undef
                        index,
                        'name',
                        e.target.value,
                      )
                    }
                  />
                </FormRow>

                {/* Start Date Picker */}
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <label>Start Date</label>
                    <CustomDatePicker
                      selectedDate={formData.startDate}
                      onChange={(date) =>
                        handleNestedChange(
                          'experience',
                          // eslint-disable-next-line no-undef
                          index,
                          'name',
                          // eslint-disable-next-line no-undef
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label>End Date</label>
                    <CustomDatePicker
                      selectedDate={formData.endDate}
                      onChange={(date) =>
                        handleNestedChange(
                          'experience',
                          // eslint-disable-next-line no-undef
                          index,
                          'name',
                          // eslint-disable-next-line no-undef
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                {/* End Date Picker */}

                <FormRow>
                  <Label>Experience Description</Label>
                  <FormArea
                    placeholder="Write experience description yourself..."
                    defaultValue={experience?.description || ''}
                    onChange={(e) =>
                      handleNestedChange(
                        'experience',
                        // eslint-disable-next-line no-undef
                        index,
                        'name',
                        e.target.value,
                      )
                    }
                  />
                </FormRow>
              </div>
            );
          })}
        </Form>
      </Content>
    </Container>
  );
};

export default SettingsPage;
