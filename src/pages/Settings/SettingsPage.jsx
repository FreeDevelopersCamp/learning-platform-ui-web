import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

import { useAuth } from '../../contexts/auth/AuthContext.jsx';
import { useGetUser } from '@/apis/core/User/hooks/useGetUser.ts';
import { useGetProfile } from '@/apis/core/Profile/hooks/useGetProfile.ts';
import { useUpdateUser } from '@/apis/core/User/hooks/useUpdateUser.ts';
import { useUpdateProfile } from '@/apis/core/Profile/hooks/useUpdateProfile.ts';
import { useDeactivateUser } from '@/apis/core/useDeactivateUser.js';
import { getServiceInstanceByRole } from '@/apis/core/useRoleData.js';
import { useUploadImage } from '@/apis/filesManager/Image/hooks/useUploadImage.ts';

import UserAvatar from '@/ui/User/UserAvatar.jsx';
import Spinner from '@/ui/Spinner.jsx';
import SettingsSidebar from './ui/SettingsSidebar.jsx';
import Modal from '@/ui/Menus/Modal.jsx';
import Menus from '@/ui/Menus/Menus.jsx';

import ConfirmDeactivate from '@/ui/Buttons/ConfirmDeactivate.jsx';
import {
  Container,
  FormArea,
  FormRow,
  Input,
  Label,
  LabelHeading,
  ProfileSection,
  SubmitButton,
  UploadButton,
  DeactivateButton,
  AddMore,
  Content,
  Form,
  UserInformation,
  ProfileInformation,
} from './ui/StyledComponents.settings.jsx';

const SettingsPage = () => {
  const { session, logout, isLoading } = useAuth();
  const { user, userLoading } = useGetUser(session?.username);
  const { profile, profileLoading } = useGetProfile(session?.username);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({});

  const { mutate: updateUser, isLoading: updatingUser } = useUpdateUser();
  const { mutate: updateProfile, isLoading: updatingProfile } =
    useUpdateProfile();

  const { isDeactivating, deactivateUser } = useDeactivateUser();
  const { uploadImage, isUploading } = useUploadImage();

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user && profile) {
      setFormData({
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
        accounts: profile?.accounts || [], // Initialize as an array
        work: profile?.work || { subtitle: '', works: [] }, // Ensure work is initialized
        certifications: profile?.certifications || {
          subtitle: '',
          otherCertifications: [],
        },
        experience: profile?.experience || { subtitle: '', experiences: [] }, // Ensure subtitle is included
        education: profile?.education || { subtitle: '', educations: [] }, // Ensure educations is an array
      });
    }
  }, [user, profile]);

  if (
    isLoading ||
    userLoading ||
    !session ||
    !user ||
    profileLoading ||
    !profile ||
    updatingUser ||
    updatingProfile ||
    isDeactivating ||
    isUploading
  )
    return <Spinner />;

  async function handleDeactivateUser(userId) {
    const serviceInstance = getServiceInstanceByRole(session.role);
    if (!serviceInstance) {
      toast.error('No service instance found for the current role');
      return;
    }

    try {
      const roleData = await serviceInstance.getByUserId(userId);
      if (!roleData || !roleData._id) {
        toast.error('Failed to fetch role-specific data');
        return;
      }

      const user = {
        role: session.role,
        roleId: roleData._id,
      };
      deactivateUser(user);
      logout();
    } catch (error) {
      toast.error('Failed to deactivate account');
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  const handleFileChange = (event, userId) => {
    const file = event.target.files?.[0]; // Get selected file

    if (!file) {
      console.error('No file selected');
      return;
    }

    uploadImage(
      { file, userId },
      {
        onSuccess: (data) => {
          toast.success('Profile image updated successfully!');
          // Optionally update the user's image in the UI
        },
        onError: (err) => {
          console.error('Error uploading file:', err);
          toast.error('Failed to upload the image');
        },
      },
    );
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const fields = field.split('.');
      if (fields.length > 1) {
        const [parent, child] = fields;
        const updatedFormData = {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
        return updatedFormData;
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleNestedChange = (type, index, field, value) => {
    setFormData((prev) => {
      if (type === 'education') {
        // Handle nested education structure
        const updatedEducations = [...(prev.education.educations || [])]; // Copy the array of educations
        updatedEducations[index] = {
          ...updatedEducations[index],
          [field]: value, // Update the specific field
        };

        return {
          ...prev,
          education: {
            ...prev.education,
            educations: updatedEducations, // Update the educations array
          },
        };
      }
      if (type === 'work') {
        const updatedWorks = [...(prev.work?.works || [])];
        updatedWorks[index] = {
          ...updatedWorks[index],
          [field]: value, // Update the specific field
        };

        return {
          ...prev,
          work: {
            ...prev.work,
            works: updatedWorks,
          },
        };
      }

      if (type === 'certifications.otherCertifications') {
        const updatedCertifications = [
          ...(prev.certifications?.otherCertifications || []),
        ];
        updatedCertifications[index] = {
          ...updatedCertifications[index],
          [field]: value,
        };

        return {
          ...prev,
          certifications: {
            ...prev.certifications,
            otherCertifications: updatedCertifications,
          },
        };
      }

      if (type === 'experience.experiences') {
        const updatedExperiences = [...(prev.experience?.experiences || [])];
        updatedExperiences[index] = {
          ...updatedExperiences[index],
          [field]: value, // Update the specific field
        };

        return {
          ...prev,
          experience: {
            ...prev.experience,
            experiences: updatedExperiences, // Update the experiences array
          },
        };
      }

      // Generic handler for flat arrays like accounts
      const updatedSection = [...prev[type]];
      updatedSection[index] = {
        ...updatedSection[index],
        [field]: value, // Update the specific field
      };

      return {
        ...prev,
        [type]: updatedSection, // Update the specific section in the state
      };
    });
  };

  const handleAddMore = (type) => {
    setFormData((prev) => {
      let updatedSection = prev[type] || []; // Initialize as an array if it's undefined

      if (type === 'accounts') {
        updatedSection = [...updatedSection, { name: '', url: '' }]; // Add new account
      } else if (type === 'education') {
        // Ensure education is initialized
        const updatedEducation = {
          subtitle: prev.education?.subtitle || '',
          educations: [
            ...(prev.education?.educations || []), // Preserve existing items
            { name: '', school: '', startDate: '', endDate: '' }, // Add new item
          ],
        };

        return {
          ...prev,
          education: updatedEducation, // Update the education section
        };
      } else if (type === 'work') {
        const updatedWorks = [
          ...(prev.work?.works || []),
          { name: '', description: '', skills: ['', '', ''] }, // New work item with 3 skills
        ];

        return {
          ...prev,
          work: {
            ...prev.work,
            works: updatedWorks,
          },
        };
      } else if (type === 'experience') {
        const updatedExperiences = [
          ...(prev.experience?.experiences || []),
          {
            name: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
          },
        ];

        return {
          ...prev,
          experience: {
            ...prev.experience,
            experiences: updatedExperiences,
          },
        };
      } else if (type === 'certifications') {
        const updatedCertifications = [
          ...(prev.certifications?.otherCertifications || []),
          { name: '', institution: '', url: '', date: '' }, // New certification template
        ];

        return {
          ...prev,
          certifications: {
            ...prev.certifications,
            otherCertifications: updatedCertifications,
          },
        };
      }

      return {
        ...prev,
        [type]: updatedSection, // Update the section with the new array
      };
    });
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

      // Update profile data
      updateProfile({
        _id: profile._id,
        state: formData.state,
        headline: formData.headline,
        position: formData.position,
        about: formData.about,
        accounts: formData.accounts,
        work: {
          subtitle: formData.work.subtitle || '', // Include updated subtitle
          works: formData.work.works || [],
        },
        certifications: {
          subtitle: formData.certifications.subtitle || '',
          otherCertifications:
            formData.certifications.otherCertifications || [],
        },
        experience: {
          subtitle: formData.experience.subtitle || '', // Correctly include subtitle
          experiences: formData.experience.experiences || [], // Correctly include experiences
        },
        education: {
          subtitle: formData.education.subtitle || '', // Include the updated subtitle
          educations: formData.education.educations || [],
        },
      });

      // Update Image data
      // updateImage(selectedFile, user._id);

      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  }

  return (
    <Container>
      <SettingsSidebar />
      <Content>
        <ProfileSection>
          <div className="flex justify-around items-center gap-4">
            <UserAvatar user={user} size={'8rem'} />
            <UploadButton onClick={handleUploadClick}>
              Upload New Picture
            </UploadButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => handleFileChange(e, user._id)}
            />
          </div>
          <div className="flex gap-x-2">
            <Menus>
              <Modal>
                <Modal.Open opens="deactivate">
                  <DeactivateButton>Deactivate Account</DeactivateButton>
                </Modal.Open>

                <Modal.Window name="deactivate">
                  <ConfirmDeactivate
                    resourceName="account"
                    onConfirm={() => handleDeactivateUser(user._id)}
                    disabled={isDeactivating}
                  />
                </Modal.Window>
              </Modal>
            </Menus>
            <SubmitButton onClick={handleSubmit}>Save Updates</SubmitButton>
          </div>
        </ProfileSection>
        <Form>
          <LabelHeading>Personal Information</LabelHeading>
          <UserInformation>
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
          </UserInformation>

          <ProfileInformation>
            <FormRow>
              <Label>State</Label>
              <Input
                type="text"
                placeholder="State"
                defaultValue={profile?.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
              />
            </FormRow>

            <LabelHeading>About Section</LabelHeading>

            <FormRow>
              <Label>Headline</Label>
              <Input
                type="text"
                placeholder="Headline"
                defaultValue={profile?.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
              />
            </FormRow>

            <LabelHeading>Education Section</LabelHeading>

            <FormRow>
              <Label>Education Subtitle</Label>
              <Input
                type="text"
                placeholder="Education Subtitle"
                value={formData.education?.subtitle || ''} // Use value from formData
                onChange={(e) =>
                  handleChange('education.subtitle', e.target.value)
                } // Pass nested field
              />
            </FormRow>

            {formData.education?.educations?.map((education, index) => (
              <FormRow key={`education-${index}`}>
                <Label>Education {index + 1}</Label>
                <Input
                  type="text"
                  placeholder="Degree Name"
                  value={education.name || ''} // Provide default empty string if undefined
                  onChange={(e) =>
                    handleNestedChange(
                      'education',
                      index,
                      'name',
                      e.target.value,
                    )
                  }
                />
                <Input
                  type="text"
                  placeholder="School/University"
                  value={education.school || ''} // Provide default empty string if undefined
                  onChange={(e) =>
                    handleNestedChange(
                      'education',
                      index,
                      'school',
                      e.target.value,
                    )
                  }
                />
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={education.startDate || ''} // Provide default empty string if undefined
                  onChange={(e) =>
                    handleNestedChange(
                      'education',
                      index,
                      'startDate',
                      e.target.value,
                    )
                  }
                />
                <Input
                  type="date"
                  placeholder="End Date"
                  value={education.endDate || ''} // Provide default empty string if undefined
                  onChange={(e) =>
                    handleNestedChange(
                      'education',
                      index,
                      'endDate',
                      e.target.value,
                    )
                  }
                />
              </FormRow>
            ))}

            <AddMore
              type="education"
              onClick={() => handleAddMore('education')}
            >
              Add More Education
            </AddMore>

            <LabelHeading>Accounts Section</LabelHeading>

            {formData.accounts?.map((account, index) => (
              <FormRow key={`account-${index}`}>
                <Label>Account {index + 1}</Label>
                <Input
                  type="text"
                  placeholder="Account Name"
                  value={account.name} // Tie the value to the state
                  onChange={
                    (e) =>
                      handleNestedChange(
                        'accounts',
                        index,
                        'name',
                        e.target.value,
                      ) // Update the state on change
                  }
                />
                <Input
                  type="text"
                  placeholder="Account URL"
                  value={account.url} // Tie the value to the state
                  onChange={
                    (e) =>
                      handleNestedChange(
                        'accounts',
                        index,
                        'url',
                        e.target.value,
                      ) // Update the state on change
                  }
                />
              </FormRow>
            ))}

            <AddMore type="account" onClick={() => handleAddMore('accounts')}>
              Add More Accounts
            </AddMore>

            <LabelHeading>Work Section</LabelHeading>

            <FormRow className="w-full">
              <Label>Work Section Subtitle</Label>
              <Input
                type="text"
                placeholder="Work Section Subtitle"
                value={formData.work?.subtitle || ''} // Bind to formData
                onChange={(e) => handleChange('work.subtitle', e.target.value)} // Use nested field handling
              />
            </FormRow>

            {formData.work?.works?.map((work, index) => (
              <div key={`work-${index}`} className="flex flex-col gap-4">
                <FormRow>
                  <Label>Work Name</Label>
                  <Input
                    type="text"
                    placeholder="Work Name"
                    value={work.name || ''} // Ensure value is tied to state
                    onChange={(e) =>
                      handleNestedChange('work', index, 'name', e.target.value)
                    }
                  />
                </FormRow>
                <FormRow>
                  <Label>Work Description</Label>
                  <FormArea
                    placeholder="Write work description yourself..."
                    value={work.description || ''}
                    maxLength={150} // Limit the input to 170 characters
                    onChange={(e) =>
                      handleNestedChange(
                        'work',
                        index,
                        'description',
                        e.target.value,
                      )
                    }
                  />
                  <span>
                    {150 - (work.description?.length || 0)} characters remaining
                  </span>
                </FormRow>
                <div className="flex flex-row gap-4">
                  {work.skills?.map((skill, skillIndex) => (
                    <FormRow
                      key={`work-${index}-skill-${skillIndex}`}
                      className="w-full"
                    >
                      <Label>Skill {skillIndex + 1}</Label>
                      <Input
                        type="text"
                        placeholder={`Skill ${skillIndex + 1}`}
                        value={skill || ''}
                        onChange={(e) => {
                          const updatedSkills = [...work.skills];
                          updatedSkills[skillIndex] = e.target.value; // Update specific skill
                          handleNestedChange(
                            'work',
                            index,
                            'skills',
                            updatedSkills,
                          );
                        }}
                      />
                    </FormRow>
                  ))}
                </div>
              </div>
            ))}

            <AddMore type="work" onClick={() => handleAddMore('work')}>
              Add More Work
            </AddMore>

            <LabelHeading>Certifications Section</LabelHeading>

            <FormRow>
              <Label>Certifications Subtitle</Label>
              <Input
                type="text"
                placeholder="Certifications Subtitle"
                value={formData.certifications?.subtitle || ''}
                onChange={(e) =>
                  handleChange('certifications.subtitle', e.target.value)
                }
              />
            </FormRow>

            {formData.certifications?.otherCertifications?.map(
              (certification, index) => (
                <div
                  key={`certification-${index}`}
                  className="flex flex-col gap-4"
                >
                  <FormRow>
                    <Label>{`Certification Name ${index + 1}`}</Label>
                    <Input
                      type="text"
                      placeholder="Certification Name"
                      value={certification.name || ''}
                      onChange={(e) =>
                        handleNestedChange(
                          'certifications.otherCertifications',
                          index,
                          'name',
                          e.target.value,
                        )
                      }
                    />
                  </FormRow>
                  <FormRow>
                    <Label>{`Institution ${index + 1}`}</Label>
                    <Input
                      type="text"
                      placeholder="Institution"
                      value={certification.institution || ''}
                      onChange={(e) =>
                        handleNestedChange(
                          'certifications.otherCertifications',
                          index,
                          'institution',
                          e.target.value,
                        )
                      }
                    />
                  </FormRow>
                  <FormRow>
                    <Label>{`URL ${index + 1}`}</Label>
                    <Input
                      type="text"
                      placeholder="URL"
                      value={certification.url || ''}
                      onChange={(e) =>
                        handleNestedChange(
                          'certifications.otherCertifications',
                          index,
                          'url',
                          e.target.value,
                        )
                      }
                    />
                  </FormRow>
                  <FormRow>
                    <Label>{`Date ${index + 1}`}</Label>
                    <Input
                      type="date"
                      placeholder="Date"
                      value={certification.date || ''}
                      onChange={(e) =>
                        handleNestedChange(
                          'certifications.otherCertifications',
                          index,
                          'date',
                          e.target.value,
                        )
                      }
                    />
                  </FormRow>
                </div>
              ),
            )}

            <AddMore
              type="certifications"
              onClick={() => handleAddMore('certifications')}
            >
              Add More Certification
            </AddMore>

            <LabelHeading>Experience Section</LabelHeading>

            <FormRow>
              <Label>Experience Subtitle</Label>
              <Input
                type="text"
                placeholder="Experience Subtitle"
                value={formData.experience?.subtitle || ''} // Correctly bind to formData
                onChange={(e) =>
                  handleChange('experience.subtitle', e.target.value)
                } // Update via handleChange
              />
            </FormRow>

            {formData.experience?.experiences?.map((experience, index) => (
              <div key={`experience-${index}`} className="flex flex-col gap-4">
                <FormRow>
                  <Label>{`Company ${index + 1}`}</Label>
                  <Input
                    type="text"
                    placeholder="Company"
                    value={experience.company || ''}
                    onChange={(e) =>
                      handleNestedChange(
                        'experience.experiences',
                        index,
                        'company',
                        e.target.value,
                      )
                    }
                  />
                </FormRow>
                <FormRow>
                  <Label>{`Title ${index + 1}`}</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={experience.name || ''}
                    onChange={(e) =>
                      handleNestedChange(
                        'experience.experiences',
                        index,
                        'name',
                        e.target.value,
                      )
                    }
                  />
                </FormRow>
                <FormRow>
                  <Label>{`Start Date ${index + 1}`}</Label>
                  <Input
                    type="date"
                    value={experience.startDate || ''}
                    onChange={(e) =>
                      handleNestedChange(
                        'experience.experiences',
                        index,
                        'startDate',
                        e.target.value,
                      )
                    }
                  />
                </FormRow>
                <FormRow>
                  <Label>{`End Date ${index + 1}`}</Label>
                  <Input
                    type="date"
                    value={experience.endDate || ''}
                    onChange={(e) =>
                      handleNestedChange(
                        'experience.experiences',
                        index,
                        'endDate',
                        e.target.value,
                      )
                    }
                  />
                </FormRow>
                <FormRow>
                  <Label>{`Description ${index + 1}`}</Label>
                  <FormArea
                    placeholder="Describe your role"
                    value={experience.description || ''}
                    maxLength={170}
                    onChange={(e) =>
                      handleNestedChange(
                        'experience.experiences',
                        index,
                        'description',
                        e.target.value,
                      )
                    }
                  />
                </FormRow>
              </div>
            ))}

            <AddMore
              type="experience"
              onClick={() => handleAddMore('experience')}
            >
              Add More Experience
            </AddMore>
          </ProfileInformation>
        </Form>
      </Content>
    </Container>
  );
};

export default SettingsPage;
