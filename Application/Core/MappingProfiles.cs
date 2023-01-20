
using Application.Courses.DTOS;
using Application.HomePhotos.DTOS;
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
            Guid GenerationId = Guid.Empty;

            CreateMap<AppUser, Profiles.DTOS.Profile>();
            CreateMap<AppUser, Domain.DTOS.Personal>();

            CreateMap<ProjectCreate, Project>();
            CreateMap<ProjectEdit, Project>();
            CreateMap<Project, ProjectDTO>();

            CreateMap<SystemSetting, SystemSettingDTO>();
            CreateMap<SystemSettingUpdate, SystemSetting>();
            CreateMap<SystemSettingDTO, SystemSetting>();

            CreateMap<HomePhoto, HomePhotoDTO>();

            CreateMap<SyllabusCreate, Syllabus>();
            CreateMap<SyllabusUpdate, Syllabus>();
            CreateMap<SubjectCreate, Subject>();
            CreateMap<Syllabus, SyllabusDTO>()
                .ForMember(a => a.Total, b => b.MapFrom(c => c.Subjects.Sum(a => a.Credit)))
                .ForMember(a => a.Avg, b => b.MapFrom(c => float.Parse(c.Subjects.Average(a => a.Credit).ToString("0.00"))));
            CreateMap<Subject, SubjectDTO>();

            CreateMap<Lecturer, LecturerDTO>()
                .ForMember(a => a.Prefixed, b => b.MapFrom(a => a.Prefix.Name));
            CreateMap<LecturerCreate, Lecturer>();
            CreateMap<LecturerUpdate, Lecturer>();

            CreateMap<Domain.Others.News, NewsPreviewDTO>()
                .ForMember(a => a.MainImage, b => b.MapFrom(c => c.NewsPhotos.FirstOrDefault(d => d.IsMain).Url));
            CreateMap<Domain.Others.News, NewsDTO>()
                .ForMember(a => a.MainImage, b => b.MapFrom(c => c.NewsPhotos.FirstOrDefault(d => d.IsMain).Url));
            CreateMap<NewsCreate, Domain.Others.News>();
            CreateMap<NewsUpdate, Domain.Others.News>();

            CreateMap<Course, CourseDetail>()
                .ForMember(a => a.Image, b => b.MapFrom(a => a.Photos.FirstOrDefault(a => a.IsMain).Url));
            CreateMap<Course, CourseDTO>()
                .ForMember(a => a.Image, b => b.MapFrom(a => a.Photos.FirstOrDefault(a => a.IsMain).Url));
            CreateMap<CourseCreate, Course>();
            CreateMap<CourseUpdate, Course>()
                .ForMember(a => a.Photos, b => b.MapFrom(a => a.Photos));
            CreateMap<Course, CourseGenerationDetail>()
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
            CreateMap<GenerationCreate, Generation>();
            CreateMap<GenerationUpdate, Generation>();
            CreateMap<Generation, GenerationDetail>();
        }
    }
}