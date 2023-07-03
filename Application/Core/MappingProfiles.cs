
using Application.Accounts.DTOS;
using Application.ComSciSubject.DTOS;
using Application.CourseComment.DTOS;
using Application.Courses.DTOS;
using Application.HomePhotos.DTOS;
using Application.JobHistory.DTOS;
using Application.Lecturers.DTOS;
using Application.News.DTOS;
using Application.Projects.DTOS;
using Application.Syllabuses.DTOS;
using Application.SystemSettings.DTOS;
using Domain;
using Domain.Others;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string GenerationId = String.Empty;
            string Username = String.Empty;
            string LecturerUsername = String.Empty;

            CreateMap<AppUser, Profiles.DTOS.Profile>()
                .ForMember(a => a.IsMe, b => b.MapFrom(c => c.UserName == Username));
            CreateMap<AppUser, Domain.DTOS.Personal>();
            CreateMap<AccountUpdate, AppUser>();

            CreateMap<Domain.DTOS.Student, UserStudent>();
            CreateMap<Domain.DTOS.Lecturer, UserLecturer>();

            CreateMap<ProjectCreate, Project>();
            CreateMap<ProjectEdit, Project>();
            CreateMap<Project, ProjectDTO>();

            CreateMap<SystemSetting, SystemSettingDTO>();
            CreateMap<SystemSettingUpdate, SystemSetting>();
            CreateMap<SystemSettingDTO, SystemSetting>();

            CreateMap<HomePhoto, HomePhotoDTO>();

            CreateMap<Syllabus, SyllabusDetail>()
                .ForMember(a => a.SubjectGeneral, b => b.MapFrom(c => c.Subjects.Where(d => d.SubjectCategory == Domain.DTOS.SubjectCategory.General)))
                .ForMember(a => a.SubjectSpecific, b => b.MapFrom(c => c.Subjects.Where(d => d.SubjectCategory == Domain.DTOS.SubjectCategory.Specific)))
                .ForMember(a => a.SubjectFreeElective, b => b.MapFrom(c => c.Subjects.Where(d => d.SubjectCategory == Domain.DTOS.SubjectCategory.FreeElective)))
                .ForMember(a => a.Objective, b => b.MapFrom(c => c.Objectives))
                .ForMember(a => a.Occupation, b => b.MapFrom(c => c.Occupations));
            CreateMap<SyllabusCreate, Syllabus>();
            CreateMap<SyllabusUpdate, Syllabus>();
            CreateMap<Syllabus, SyllabusDTO>()
                .ForMember(a => a.Objective, b => b.MapFrom(c => c.Objectives.Select(d => d.Sentence)))
                .ForMember(a => a.Occupation, b => b.MapFrom(c => c.Occupations.Select(d => d.Sentence)))

                .ForMember(a => a.SubjectGeneral, b => b.MapFrom(c => c.Subjects.Where(d => d.SubjectCategory == Domain.DTOS.SubjectCategory.General)))
                .ForMember(a => a.SubjectSpecific, b => b.MapFrom(c => c.Subjects.Where(d => d.SubjectCategory == Domain.DTOS.SubjectCategory.Specific)))
                .ForMember(a => a.SubjectFreeElective, b => b.MapFrom(c => c.Subjects.Where(d => d.SubjectCategory == Domain.DTOS.SubjectCategory.FreeElective)))

                .ForMember(a => a.Avg, b => b.MapFrom(c => c.Subjects != null && c.Subjects.Any() ? float.Parse(c.Subjects.Average(a => a.Credit).ToString("0.00")) : 0.0f))
                .ForMember(a => a.Total, b => b.MapFrom(c => c.Subjects != null && c.Subjects.Any() ? c.Subjects.Sum(a => a.Credit) : 0));
            CreateMap<Subject, SubjectDTO>();

            CreateMap<Lecturer, LecturerDTO>();
            CreateMap<LecturerCreate, Lecturer>();
            CreateMap<LecturerUpdate, Lecturer>();

            CreateMap<Domain.Others.News, NewsPreviewDTO>()
                .ForMember(a => a.MainImage, b => b.MapFrom(c => c.NewsPhotos.FirstOrDefault(d => d.IsMain).Url));
            CreateMap<Domain.Others.News, NewsDTO>()
                .ForMember(a => a.MainImage, b => b.MapFrom(c => c.NewsPhotos.FirstOrDefault(d => d.IsMain).Url));
            CreateMap<NewsCreate, Domain.Others.News>();
            CreateMap<NewsUpdate, Domain.Others.News>();

            CreateMap<Course, CourseDetail>()
                .ForMember(a => a.Generations, b => b.MapFrom(c => c.Generations.OrderByDescending(d => d.CreatedAt)))
                .ForMember(a => a.Image, b => b.MapFrom(a => a.Photos.FirstOrDefault(a => a.IsMain).Url));
            CreateMap<Course, CourseDTO>()
                .ForMember(a => a.Image, b => b.MapFrom(a => a.Photos.FirstOrDefault(a => a.IsMain).Url));
            CreateMap<Course, CoursePreview>()
            .ForMember(a => a.Image, b => b.MapFrom(a => a.Photos.FirstOrDefault(a => a.IsMain).Url));
            CreateMap<CourseCreate, Course>();
            CreateMap<CourseUpdate, Course>()
                .ForMember(a => a.Photos, b => b.MapFrom(a => a.Photos));
            CreateMap<Course, CourseGenerationDetail>()
                .ForMember(a => a.IsHost, b => b.MapFrom(a => a.Lecturer.UserName == Username))
                .ForMember(a => a.Image, b => b.MapFrom(a => a.Photos.FirstOrDefault(a => a.IsMain).Url))
                .ForMember(a => a.Generation, b => b.MapFrom(c => c.Generations.FirstOrDefault(a => a.Id == GenerationId)));
            CreateMap<CourseAttendee, AttendeeDTO>()
                .ForMember(a => a.FullName, b => b.MapFrom(a => a.AppUser.FullName))
                .ForMember(a => a.Username, b => b.MapFrom(a => a.AppUser.UserName))
                .ForMember(a => a.Image, b => b.MapFrom(a => a.AppUser.Image))
                .ForMember(a => a.Email, b => b.MapFrom(a => a.AppUser.Email))
                .ForMember(a => a.date, b => b.MapFrom(a => a.CreatedAt));
            CreateMap<Generation, GenerationDTO>()
                .ForMember(a => a.AttendeeCount, b => b.MapFrom(a => a.Attendees.Count));
            CreateMap<Generation, GenerationList>()
                .ForMember(a => a.IsHost, b => b.MapFrom(a => a.Course.Lecturer.UserName == LecturerUsername))
                .ForMember(a => a.PreviewAttendees, b => b.MapFrom(a => a.Attendees.Take(3)))
                .ForMember(a => a.AttendeeCount, b => b.MapFrom(a => a.Attendees.Count));
            CreateMap<GenerationCreate, Generation>();
            CreateMap<GenerationUpdate, Generation>();
            CreateMap<Generation, GenerationDetail>()
                .ForMember(a => a.Attendees, b => b.MapFrom(c => c.Attendees.OrderBy(d => d.CreatedAt)));
            CreateMap<Domain.CourseComment, CourseCommentDTO>();

            CreateMap<Domain.JobHistory, JobHistoryDTO>();
            CreateMap<Domain.JobHistory, JobHistoryUserDTO>()
                .ForMember(a => a.Created, b => b.MapFrom(a => a.CreatedAt))
                .ForMember(a => a.IsUse, b => b.MapFrom(a => a.IsUsed));
            CreateMap<JobHistoryDTO, Domain.JobHistory>();

            CreateMap<ComSciSubjectCreate, ComputerScienceSubject>();
            CreateMap<ComSciSubjectUpdate, ComputerScienceSubject>();
            CreateMap<ComputerScienceSubject, ComSciSubjectPreview>();
        }
    }
}